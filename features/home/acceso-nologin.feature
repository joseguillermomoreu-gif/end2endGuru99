@home @smoke @nologin
Feature: Acceso a la página principal sin login
  Como visitante no autenticado
  Quiero acceder a la página principal de Guru99 Bank
  Para poder ver el formulario de login y información básica

  Background:
    Given que el sistema Guru99 Bank está disponible

  @critical @homepage-access
  Scenario: Usuario no autenticado puede acceder a la página principal
    When un usuario navega a la página principal de Guru99 Bank
    Then se debe mostrar el formulario de login correctamente

  @regression @title-verification  
  Scenario: La página principal muestra el título correcto
    When un usuario accede a la página principal de Guru99 Bank
    And la página se carga completamente
    Then el título HTML debe ser exactamente "Guru99 Bank Home Page"

  @regression @page-elements
  Scenario: Elementos principales están presentes en la página de inicio
    When un usuario navega a la página principal de Guru99 Bank
    Then debe ver el formulario de login
    And debe ver el logo de Guru99 Bank
    And debe ver el título de la página
