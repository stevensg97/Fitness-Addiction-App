export const ALERTS = {
  // ----------- Login Alerts ----------- //
  INVALID_EMAIL: 'Debe ingresar un correo electrónico válido.',
  INVALID_PASSWORD: 'Debe ingresar la contraseña.',
  LOGIN_NOT_MATCH: 'Correo electrónico o contraseña incorrecta.',
  ERROR_ON_LOGIN: 'Algo salió mal. Revise su correo electrónico o intente más tarde.',
  // ----------- SignIn Alerts ----------- //
  EMAIL_ALREADY_EXIST: 'El correo ya se encuentra registrado.',
  EMPTY_NAME: 'Debe ingresar el nombre.',
  EMPTY_FLNAME: 'Debe ingresar el primer apellido.',
  EMPTY_SLNAME: 'Debe ingresar el segundo apellido.',
  EMPTY_EMAIL: 'Debe ingresar el correo electrónico válido.',
  EMPTY_PASSWORD: 'Debe ingresar la contraseña.',
  EMPTY_CHECK_PASSWORD: 'Debe verificar la contraseña.',
  PASSWORD_DOES_NOT_MATCH: 'La contraseña no coincide.',
  USER_CREATED_SUCCESSFULLY: 'Usuario registrado satisfactoriamente.',

  FAILURE: 'Algo salió mal, por favor inténtelo de nuevo.',


  ROUTINE_MODAL_CLOSED: 'Se ha cerrado la rutina.'
}

export const ALERT_TITLES = {
  ERROR: '¡Error!',
  SUCCESS: '¡Éxito!',
  WARNING: '¡Cuidado!',
  INFO: 'Información'
}

export const TYPE_ALERT = {
  ERROR: 'error',
  SUCCESS: 'success',
  WARNING: 'warning',
  INFO: 'info'
}



export const BUTTONS = {
  LOGIN: 'Iniciar Sesión',
  SIGNIN: 'Registrarse',
  FORGOT: '¿Olvidó su contraseña?',
  LANGUAGE: 'Language',
  LOGOUT: 'Log Out',
  ABOUT: 'About',
  DONE: 'Done',
  CONFIRM: 'Confirm',
  ACEPTAR: 'Aceptar',
  CANCELAR: 'Cancelar',
  OK: 'OK',
  FACTURAS: 'Facturas',
  INVENTARIO: 'Inventario',
  BUSCAR: 'Buscar',
  CLOSE: 'Cerrar'
}

export const ICONS = {
  IOS_SEARCH: 'ios-search',
  MD_ADD: 'md-add',
  MD_APPS: 'md-apps',
  MD_TRENDING_UP: 'md-trending-up',
  MD_STATS: 'md-stats',
  MD_CAMERA: 'md-camera',
  MD_TIME: 'md-time',
  MD_CLIPBOARD: 'md-clipboard',
  MD_PAPER: 'md-paper',
  MD_REFRESH: 'md-refresh',
  MD_OPTIONS: 'md-options',
  MD_RIGHT_ARROW: 'md-arrow-round-forward',
  MD_HOME: 'md-home',
  MD_PERSON: 'md-person',
  MD_LIST: 'md-list',
  MD_CART: 'md-cart',
  MD_COG: 'md-cog',
  MD_CHATBUBBLES: 'md-chatbubbles',
  MD_INFOMATION_CIRCLE: 'md-information-circle',
  MD_LOG_OUT: 'md-log-out',
  MD_CALL: 'md-call',
  MD_MAIL: 'md-mail',
  MD_PIN: 'md-pin',
  MD_ARROW_BACK: 'md-arrow-back',
  MD_CHECKMARK: 'md-checkmark',
  MD_HOME_OUTLINE: 'md-home-outline',
  MD_PERSON_OUTLINE: 'md-person-outline',
  MD_LIST_OUTLINE: 'md-list-outline',
  MD_CART_OUTLINE: 'md-cart-outline',
  MD_COG_OUTLINE: 'md-cog-outline',
  MD_CHATBUBBLES_OUTLINE: 'md-chatbubbles-outline',
  MD_INFOMATION_CIRCLE_OUTLINE: 'md-information-circle-outline',
  MD_LOG_OUT_OUTLINE: 'md-log-out-outline',
  MD_CLIPBOARD_OUTLINE: 'md-clipboard-outline',
  MD_TIME_OUTLINE: 'md-time-outline',
  MD_STATS_OUTLINE: 'md-stats-outline',
  MD_TRENDING_UP_OUTLINE: 'md-trending-up-outline',
  LOGO_FACEBOOK: 'logo-facebook',
  LOGO_INSTAGRAM: 'logo-instagram',
}

export const LANGUAGES = {
  EN: 'English',
  ES: 'Spanish'
}

export const AD_TYPES = {
  AD: 'ad',
  EVENT: 'event'
}

export const SCREENS = {
  HOME: 'Home',
  PROFILE: 'Profile',
  SCHEDULE: 'Schedule',
  STORE: 'Store',
  CONFIGURATIONS: 'Configurations',
  CONTACT: 'Contact',
  ABOUT: 'About',
  LOGIN: 'Login',
  SIGNIN: 'Signin',
  PAYMENTS: 'Payments',
}

export const DRAWER_OPTIONS = [
  // [SCREEN, TITLE, ICON]
  [SCREENS.HOME, 'Inicio', ICONS.MD_HOME_OUTLINE],
  [SCREENS.PROFILE, 'Perfil', ICONS.MD_PERSON_OUTLINE],
  [SCREENS.SCHEDULE, 'Horario', ICONS.MD_TIME_OUTLINE],
  [SCREENS.STORE, 'Tienda', ICONS.MD_CART_OUTLINE],
  //[SCREENS.CONFIGURATIONS, 'Configuraciones', ICONS.MD_COG_OUTLINE],
  [SCREENS.CONTACT, 'Contacto', ICONS.MD_CHATBUBBLES_OUTLINE],
  [SCREENS.ABOUT, 'Acerca de', ICONS.MD_INFOMATION_CIRCLE_OUTLINE]
]

export const PLACEHOLDERS = {
  FNAME: 'Nombre',
  FLNAME: 'Primer apellido',
  SLNAME: 'Segundo apellido',
  EMAIL: 'Correo electrónico',
  PASSWORD: 'Contraseña',
  CHECK_PASSWORD: 'Verificar contraseña',
  PHONE_NUMBER: 'Teléfono',
  HEIGHT: 'Altura (cm)',
  WEIGHT: 'Peso (kg)',
  BMI: 'IMC',
  MUSCLE_PERCENTAGE: 'Porcentaje muscular',
  BODY_FAT_PERCENTAGE: 'Porcentaje de grasa',
  BONE_PERCENTAGE: 'Porcentaje óseo',
  SUBSCRIPTION: 'Suscripción',
  CHANGE_PASSWORD: 'Cambiar contraseña',
  DELETE_ACCOUNT: 'Borrar cuenta'
}

export const TITLES = {
  FITNESS_ADDICTION: 'Fitness Addiction',
  HOME: 'Inicio',
  ROUTINES: 'Rutinas',
  PROFILE: 'Perfil',
  SCHEDULE: 'Horario',
  STORE: 'Tienda',
  CONFIGURATIONS: 'Configuraciones',
  CONTACT: 'Contacto',
  ABOUT: 'Acerca de',
  LOGOUT: 'Cerrar Sesión',
  SETS: 'Sets',
  REPETITIONS: 'Reps',
  CADENCY: 'Cad',
  REST: 'Desc',
  DATE: 'Fecha',
  TIME: 'Hora',
  SPACE_AVAILABLE: 'Cupos disponibles',
  REGISTER: 'Inscribirse',
  WELCOME: 'Bienvenido',
  SUPERSET: '(Superserie)',
  PHONE_NUMBER: 'Teléfono',
  EMAIL: 'Correo electrónico',
  LOCATION: 'Ubicación',
  SOCIAL_NETWORKS: 'Redes sociales',
  INFORMATION: 'Información',
  BODY_MEASURES: 'Medidas Corporales',
  ACCOUNT: 'Cuenta',
  PRICE: 'Precio',
  QUANTITY: 'Cantidad',
  PAYMENTS: 'Pagos'

}

export const VALUES = {
  DATE_API_URL: 'http://worldclockapi.com/api/json/est/now',
  WEBPAGE: 'Web Page',
  DATE: 'Date: ',
  DATE_MODE: 'date',
  DESCRIPTION: 'Description: ',
  PLACE: 'Place: ',
  DATE_FORMAT: 'MM-DD-YYYY',
  MIN_DATE: '01-01-2016',
  MAX_DATE: '01-01-2030',
  INFORMATION: 'information',
  ROOMS: 'rooms',
  SERVICES: 'services',
  TYPES: 'types',
  AIRPORTS: "airports",
  CASINOS: "casinos",
  BEACHES: "beaches",
  GROUPS: "groups",
  POOLS: "pools",
  RESTAURANTS: "restaurants",
  CALENDARS: "calendars",
  CLIENTS: 'clients',
  AIRPORT: "Airport",
  CASINO: "Casino",
  BEACH: "Beach",
  GROUP: "Group",
  POOL: "Pool",
  ZONE: "zones",
  NETWORKS: "networks",
  EXPERIENCES: "experiences",
  CONTACT: "contacts",
  ACTIVITIES: "activities",
  RESTAURANT: "Restaurant",
  EMAIL: 'email',
  ERROR: 'Error',
  RATING: 'Rating: ',
  SELECT_DATE: 'Select the date to consult',
  WEATHER: 'Weather',
  CERO: 0,
  UNO: 1,
  UP: 'Up',
  BOTTOM_LEFT: 'bottomLeft',
  BOTTOM_RIGHT: 'bottomRight',
  NONE: 'none',
  EMAIL_ADDRESS: 'email-address',
  NEXT: 'next',
  GO: 'go'
}
