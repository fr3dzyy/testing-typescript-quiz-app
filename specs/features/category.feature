Feature: Category

  Scenario: Pick a category
    Given category: history
    When Check if the category is correct
    Then The picked category should be: history
