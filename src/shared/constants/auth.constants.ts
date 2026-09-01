export const AUTH_MESSAGES = {
  SWAGGER: {
    TAG: 'Auth',
    LOGIN_LOCAL_SUMMARY: 'Login tradicional con email y contraseña',
    LOGIN_LOCAL_SUCCESS: 'Login exitoso y devuelve token JWT',
    LOGIN_GOOGLE_SUMMARY: 'Login con token de Google Identity Services',
    LOGIN_GOOGLE_SUCCESS: 'Verificación exitosa y devuelve token interno',
    INVALID_CREDENTIALS_DESC: 'Credenciales inválidas',
    GOOGLE_TOKEN_ERROR_DESC: 'Error al validar el token de Google',
    DTO_EMAIL_DESC: 'El correo del usuario',
    DTO_PASSWORD_DESC: 'La contraseña del usuario',
    DTO_GOOGLE_TOKEN_DESC: 'El ID token provisto por Google',
  },
  ERRORS: {
    INVALID_CREDENTIALS: 'Credenciales inválidas',
    INVALID_GOOGLE_TOKEN: 'Token de Google inválido',
    USER_NOT_REGISTERED: 'El usuario de Google no está registrado en el sistema',
    GOOGLE_VALIDATION_ERROR: 'Error al validar el token de Google',
  },
};
