@login @authentication @smoke
Feature: Autenticación de usuario
  Como usuario del banco Guru99
  Quiero poder autenticarme en el sistema
  Para acceder a las funcionalidades del banco

  Background:
    Given que el sistema Guru99 Bank está disponible
    And el usuario está en la página de login

  @critical @login-success
  Scenario: Login exitoso con credenciales válidas
    When el usuario introduce las credenciales válidas
    And hace click en el botón de login
    Then el usuario debe ser autenticado correctamente
    And debe ver el mensaje de bienvenida con su ID de usuario
    And no debe ver el formulario de login

  @regression @reset-functionality
  Scenario: Botón reset limpia los campos correctamente
    When el usuario introduce credenciales en el formulario
    And hace click en el botón reset del login
    Then los campos de usuario y contraseña deben estar vacíos
    And el formulario de login debe seguir visible

  @validation @login-workflow
  Scenario: Flujo completo de login
    Given que los campos de login están vacíos inicialmente
    When el usuario completa el proceso de login con credenciales válidas
    Then debe acceder al panel de administración
    And debe ver su ID de manager en la página principal
