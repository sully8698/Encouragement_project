class IntOrStrConverter:
    regex = r'[0-9]+|[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}'


    # returns the converted value when matches a URL
    def to_python(self, value):
        if value.isdigit():
            return int(value)
        else:
            return str(value)
    
    # returns a string to be used in URL
    def to_url(self, value):
        return str(value)