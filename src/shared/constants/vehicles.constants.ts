export const VEHICLES_CONSTANTS = {
  SWAGGER: {
    TAG: 'Vehicles',
    SUMMARY: 'Obtener snapshot actual de vehículos GBFS',
    SUCCESS: 'Vehículos obtenidos exitosamente',
    ERROR: 'Error al consultar el proveedor de vehículos',
  },
  ERRORS: {
    FETCH_FAILED: 'Error al conectar con el servicio de vehículos',
    TIMEOUT: 'Tiempo de espera agotado al consultar el proveedor',
    EMPTY_OR_INVALID: 'No se encontraron vehículos disponibles o los datos son inválidos',
  },
  DEFAULTS: {
    BASE_URL: 'https://gbfs.lyft.com/gbfs/1.1/pdx/en',
    FEED_PATH: 'free_bike_status.json',
    PROVIDER_NAME: 'Lyft',
    TIMEOUT_MS: 10000,
  },
} as const;
