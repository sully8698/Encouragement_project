from django.core.exceptions import ValidationError

import re

def validate_name(name): 
    error_message = 'Name may only contain letters and start with a capital letter, example First name "Sean" or example last name "Johnson"'
    # Message we want to give the user when passing incorrect input
    regex = r'^[A-Z][a-z]*$'
    # ^: The caret symbol denotes the start of the string.
    # [A-Z]: This matches a single capital letter at the beginning of the string.
    # [a-z]*: This matches zero or more occurrences of any alphabetic character (both uppercase and lowercase) after the first capital letter.
    # $: The dollar sign denotes the end of the string.
    good_name = re.match(regex, name)
    # returns a boolean value [True || False]
    if good_name:
        return name
    else:
        raise ValidationError(error_message, params={ 'name' : name })