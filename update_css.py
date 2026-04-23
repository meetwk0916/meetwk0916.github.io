with open("assets/css/love-timer.css", "r") as f:
    css = f.read()

# Add a default rule to hide keyboard hint
css = css.replace('.quote:focus-visible .hint-mouse {', '.hint-keyboard {\n    display: none;\n}\n\n.quote:focus-visible .hint-mouse {')

with open("assets/css/love-timer.css", "w") as f:
    f.write(css)
