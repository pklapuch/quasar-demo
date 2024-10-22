// TODO: Use `vue-cookies` ?
// import Vue from 'vue';
// import VueCookies from 'vue-cookies';

export function setCookie(id: string, value: string) {
  document.cookie = id + '=' + value;
}

export function getCookie(id: string): string | null {
  const value = document.cookie.match('(^|;)?' + id + '=([^;]*)(;|$)');
  return value ? unescape(value[2]) : null;
}
