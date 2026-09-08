import {
  Injectable,
  BadGatewayException,
  GatewayTimeoutException,
  Logger,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  GbfsRawResponse,
  VehicleQueryDto,
  VehiclesResponseDto,
} from './dto/vehicles.dto';
import { VEHICLES_CONSTANTS } from '../shared/constants/vehicles.constants';
import {
  formatVehiclesResponse,
  parseBikesToVehicles,
} from './utils/vehicles.parser';

@Injectable()
export class VehiclesService {
  private readonly logger = new Logger(VehiclesService.name);
  private readonly baseUrl: string;
  private readonly feedPath: string;
  private readonly providerName: string;
  private readonly timeoutMs: number;

  constructor(private readonly configService: ConfigService) {
    this.baseUrl =
      this.configService.get<string>('GBFS_BASE_URL') ||
      VEHICLES_CONSTANTS.DEFAULTS.BASE_URL;
    this.feedPath =
      this.configService.get<string>('GBFS_FEED_PATH') ||
      VEHICLES_CONSTANTS.DEFAULTS.FEED_PATH;
    this.providerName =
      this.configService.get<string>('GBFS_PROVIDER_NAME') ||
      VEHICLES_CONSTANTS.DEFAULTS.PROVIDER_NAME;
    this.timeoutMs = Number(
      this.configService.get<string>('GBFS_TIMEOUT_MS') ||
        VEHICLES_CONSTANTS.DEFAULTS.TIMEOUT_MS,
    );
  }

  async getVehicles(query?: VehicleQueryDto): Promise<VehiclesResponseDto> {
    const rawFeed = await this.fetchGbfsFeed();

    if (!rawFeed?.data?.bikes || rawFeed.data.bikes.length === 0) {
      throw new BadGatewayException(
        VEHICLES_CONSTANTS.ERRORS.EMPTY_OR_INVALID,
      );
    }

    let vehicles = parseBikesToVehicles(rawFeed.data.bikes);

    if (query?.type) {
      vehicles = vehicles.filter((v) => v.type === query.type);
    }

    if (query?.limit && query.limit > 0) {
      vehicles = vehicles.slice(0, query.limit);
    }

    return formatVehiclesResponse(
      vehicles,
      rawFeed,
      this.providerName,
      VEHICLES_CONSTANTS.SWAGGER.SUCCESS,
    );
  }

  private async fetchGbfsFeed(): Promise<GbfsRawResponse> {
    const cleanBaseUrl = this.baseUrl.replace(/\/+$/, '');
    const cleanFeedPath = this.feedPath.replace(/^\/+/, '');
    const endpoint = `${cleanBaseUrl}/${cleanFeedPath}`;

    try {
      const response = await fetch(endpoint, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'User-Agent': 'GBS-Backend-Agent/1.0',
        },
        signal: AbortSignal.timeout(this.timeoutMs),
      });

      if (!response.ok) {
        this.logger.error(
          `Error al consultar feed GBFS: status ${response.status} ${response.statusText}`,
        );
        throw new BadGatewayException(
          `${VEHICLES_CONSTANTS.ERRORS.FETCH_FAILED} (HTTP ${response.status})`,
        );
      }

      return (await response.json()) as GbfsRawResponse;
    } catch (error: any) {
      if (error instanceof BadGatewayException) {
        throw error;
      }

      if (error?.name === 'TimeoutError' || error?.name === 'AbortError') {
        this.logger.error(`Timeout al consultar endpoint GBFS: ${endpoint}`);
        throw new GatewayTimeoutException(
          VEHICLES_CONSTANTS.ERRORS.TIMEOUT,
        );
      }

      this.logger.error(`Excepción al consultar feed GBFS: ${error?.message}`);
      throw new BadGatewayException(
        VEHICLES_CONSTANTS.ERRORS.FETCH_FAILED,
      );
    }
  }
}
