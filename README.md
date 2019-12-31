## Visual Studio Code Issues Scanner

The project is deployed on Heroku at the following adress :

https://vscode-issues-scanner.herokuapp.com/

### The application has 3 functionnalities :

- **Labels** allows you to visualize the number of Labels per Issue. It uses Redux for state management.
- **Active Issues** allows you to visualize the number of active issues by choosing the time period you want.
- **Authors** allows you to search for specific authors by name, list the most recent authors, and see how many issues they have posted on the repository.

The repository scanned is the github microsoft/vscode repository.
It uses the github API to fetch data from it.
