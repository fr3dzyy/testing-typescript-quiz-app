Feature: Category

  Scenario: Pick a category
    Given category: music
    When Check if the category is correct
    Then The picked category should be: music
