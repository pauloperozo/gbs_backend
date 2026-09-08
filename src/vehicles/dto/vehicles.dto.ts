import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsInt, IsOptional, Max, Min } from 'class-validator';
import { Type } from 'class-transformer';

export enum VehicleType {
  BIKE = 'bike',
  SCOOTER = 'scooter',
}

export class LocationDto {
  @ApiProperty({ example: 45.485613 })
  latitude!: number;

  @ApiProperty({ example: -122.647459 })
  longitude!: number;
}

export class VehicleDto {
  @ApiProperty({ example: '7b0800e339197dc254d389e08098bb54' })
  id!: string;

  @ApiProperty({ example: '642-549' })
  name!: string;

  @ApiProperty({ enum: VehicleType, example: VehicleType.BIKE })
  type!: VehicleType;

  @ApiProperty({ type: LocationDto })
  location!: LocationDto;

  @ApiProperty({ example: false })
  isReserved!: boolean;

  @ApiProperty({ example: false })
  isDisabled!: boolean;
}

export class VehiclesDataDto {
  @ApiProperty({ type: [VehicleDto] })
  vehicles!: VehicleDto[];

  @ApiProperty({ example: 1250 })
  total!: number;

  @ApiProperty({ example: 'Lyft' })
  provider!: string;

  @ApiProperty({ example: '2026-09-08T08:16:33.000Z' })
  lastUpdated!: string;

  @ApiProperty({ example: 60 })
  ttl!: number;
}

export class VehiclesResponseDto {
  @ApiProperty({ example: true })
  success!: boolean;

  @ApiProperty({ example: 'Vehículos obtenidos exitosamente' })
  message!: string;

  @ApiProperty({ type: VehiclesDataDto })
  data!: VehiclesDataDto;

  @ApiProperty({ example: '2026-09-08T08:16:35.123Z' })
  timestamp!: string;
}

export class VehicleQueryDto {
  @ApiPropertyOptional({ enum: VehicleType, description: 'Filtrar por tipo de vehículo (bike, scooter)' })
  @IsOptional()
  @IsEnum(VehicleType)
  type?: VehicleType;

  @ApiPropertyOptional({ example: 100, description: 'Límite de vehículos a devolver (opcional)' })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(5000)
  limit?: number;
}

export interface GbfsRawBike {
  readonly bike_id: string;
  readonly name?: string;
  readonly type?: string;
  readonly lat: number;
  readonly lon: number;
  readonly is_reserved: number;
  readonly is_disabled: number;
}

export interface GbfsRawResponse {
  readonly data?: {
    readonly bikes?: readonly GbfsRawBike[];
  };
  readonly last_updated?: number;
  readonly ttl?: number;
  readonly version?: string;
}
