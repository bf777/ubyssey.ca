# Ubyssey Dispatch Theme

## Installation

[Mac Instructions](SETUP-MAC.md)

[Windows Instructions](SETUP-WINDOWS.md)

## Development

Once you have your local environment configured, follow these steps to start the server for development:

### Mac OSX

```bash
# Start the MySQL server
mysql.server start

# If that doesn't work, try:
brew services start mysql

# Activate your virtualenv (if you're using one)
cd ubyssey-dev
source bin/activate

# Run the server!
cd ubyssey-dispatch-theme
python manage.py runserver

# In a separate terminal tab, start the gulp process. It will watch for changes to the source files and automatically re-build the static files during development.
cd ubyssey-dispatch-theme/ubyssey/static/
gulp
```

### Windows

First, make sure your MySQL server is running!

```bash

# Activate your virtualenv (if you're using one)
cd ubyssey-dev
.\Scripts\activate

# Run the server!
cd ubyssey-dispatch-theme
python manage.py runserver

# In a separate command prompt window, start the gulp process. It will watch for changes to the source files and automatically re-build the static files during development.
cd ubyssey-dispatch-theme/ubyssey/static/
gulp
```
