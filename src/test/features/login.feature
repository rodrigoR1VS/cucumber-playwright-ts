Feature: Login
    Scenario: Login Correctly
        Given user go to truckercloud page
        When user enters valid username and password
        When clicks Login
        Then page login correctly and load dahsboard

