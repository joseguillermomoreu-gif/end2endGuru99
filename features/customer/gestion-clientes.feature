@customer @management @regression
Feature: Gestión de clientes bancarios
  Como administrador del banco
  Quiero poder gestionar clientes
  Para mantener la base de datos de clientes actualizada

  Background:
    Given que el sistema Guru99 Bank está disponible
    And el administrador está autenticado en el sistema
    And accede al menú de nuevo cliente

  @critical @customer-creation
  Scenario Outline: Crear cliente exitosamente
    When completa el formulario con datos válidos para "<gender>" - "<name>"
    And envía el formulario de creación
    Then el cliente debe ser creado exitosamente
    And debe mostrar la tabla de confirmación con los datos correctos

    Examples:
      | gender | name            |
      | male   | Juan Perez      |
      | female | Cristina Garcia |

  @validation @required-fields
  Scenario: Validar campos obligatorios
    When envía el formulario vacío sin completar campos
    Then debe aparecer un mensaje indicando que complete todos los campos
    And el formulario debe permanecer visible

  @validation @field-validation
  Scenario Outline: Validar campos individuales
    Given completa el formulario con datos válidos
    When modifica el campo "<field>" con valor inválido "<invalid_value>"
    Then debe aparecer el mensaje de error "<expected_error>"

    Examples:
      | field     | invalid_value      | expected_error                    |
      | name      | !@#$$%^^&*()_+    | Special characters are not allowed|
      | name      | 12                | Numbers are not allowed           |
      | address   | $$$ Calle 123 ### | Special characters are not allowed|
      | city      | 1234!@#           | Special characters are not allowed|
      | city      | 56                | Numbers are not allowed           |
      | state     | $$$               | Special characters are not allowed|
      | state     | 78                | Numbers are not allowed           |
      | pin       | abcdef            | Characters are not allowed        |
      | pin       | abcde!            | Special characters are not allowed|
      | pin       | 90                | PIN Code must have 6 Digits      |
      | telephone | phone!@#          | Special characters are not allowed|
      | telephone | phoneeeeeee       | Characters are not allowed        |
      | email     | correo_invalido@@@| Email-ID is not valid             |

  @functionality @reset-form
  Scenario: Botón reset limpia el formulario
    Given completa el formulario con datos válidos
    When hace click en el botón reset
    Then todos los campos deben estar vacíos

  @navigation @dashboard-return
  Scenario: Navegar de vuelta al dashboard
    Given está en el formulario de nuevo cliente
    When regresa al dashboard desde el formulario
    Then debe mostrar correctamente el dashboard principal
    And debe ver el mensaje de bienvenida del administrador
    And debe ver el menú lateral disponible

  @smoke @customer-workflow
  Scenario: Flujo completo de creación de cliente
    Given el formulario está limpio y visible
    When completa todos los pasos de creación de cliente
    Then el proceso debe completarse exitosamente
    And debe poder navegar de vuelta al dashboard

  @data-integrity @customer-confirmation
  Scenario: Verificar integridad de datos en confirmación
    When crea un cliente con todos los datos requeridos
    Then la tabla de confirmación debe mostrar exactamente los mismos datos
    And no debe haber discrepancias en los valores mostrados
