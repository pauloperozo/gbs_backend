import {
  GbfsRawBike,
  GbfsRawResponse,
  VehicleDto,
  VehiclesResponseDto,
  VehicleType,
} from '../dto/vehicles.dto';

export const parseBikesToVehicles = (
  bikes: readonly GbfsRawBike[],
): VehicleDto[] => {
  return bikes.map((bike) => ({
    id: bike.bike_id,
    name: bike.name || bike.bike_id,
    type: bike.type?.toLowerCase().includes(VehicleType.SCOOTER)
      ? VehicleType.SCOOTER
      : VehicleType.BIKE,
    location: {
      latitude: bike.lat,
      longitude: bike.lon,
    },
    isReserved: bike.is_reserved === 1,
    isDisabled: bike.is_disabled === 1,
  }));
};

export const parseLastUpdatedToIso = (lastUpdated?: number): string => {
  const lastUpdatedMs = lastUpdated
    ? lastUpdated < 1e11
      ? lastUpdated * 1000
      : lastUpdated
    : Date.now();

  return new Date(lastUpdatedMs).toISOString();
};

export const formatVehiclesResponse = (
  vehicles: VehicleDto[],
  rawFeed: GbfsRawResponse,
  providerName: string,
  message: string,
): VehiclesResponseDto => {
  return {
    success: true,
    message,
    data: {
      vehicles,
      total: vehicles.length,
      provider: providerName,
      lastUpdated: parseLastUpdatedToIso(rawFeed.last_updated),
      ttl: rawFeed.ttl ?? 60,
    },
    timestamp: new Date().toISOString(),
  };
};
