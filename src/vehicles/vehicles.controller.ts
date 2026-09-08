import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Query,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { VehiclesService } from './vehicles.service';
import { VehicleQueryDto, VehiclesResponseDto } from './dto/vehicles.dto';
import { VEHICLES_CONSTANTS } from '../shared/constants/vehicles.constants';

@ApiTags(VEHICLES_CONSTANTS.SWAGGER.TAG)
@Controller('vehicles')
export class VehiclesController {
  constructor(private readonly vehiclesService: VehiclesService) {}

  @Get('/')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: VEHICLES_CONSTANTS.SWAGGER.SUMMARY })
  @ApiResponse({
    status: HttpStatus.OK,
    description: VEHICLES_CONSTANTS.SWAGGER.SUCCESS,
    type: VehiclesResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.BAD_GATEWAY,
    description: VEHICLES_CONSTANTS.SWAGGER.ERROR,
  })
  async getVehicles(
    @Query() query: VehicleQueryDto,
  ): Promise<VehiclesResponseDto> {
    return this.vehiclesService.getVehicles(query);
  }
}
