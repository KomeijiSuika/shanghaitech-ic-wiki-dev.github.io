"""Resolve repository links and typeset LaTeX while MkDocs builds each page."""

import re
from html import unescape
from xml.etree.ElementTree import tostring

from latex2mathml.converter import convert_to_element
from mkdocs.exceptions import PluginError


def on_page_markdown(markdown, *, config, **kwargs):
    return markdown.replace("{{ repo_url }}", config.repo_url.rstrip("/"))


# Arithmatex emits escaped TeX text with \(…\) or \[…\] delimiters.
FORMULA = re.compile(
    r'<(?P<tag>span|div) class="arithmatex">(?P<wrapped>[^<]*)</(?P=tag)>'
)


def on_page_content(html, *, page, **kwargs):
    def typeset(match):
        latex = unescape(match["wrapped"][2:-2]).strip()
        display = "block" if match["tag"] == "div" else "inline"
        try:
            math = convert_to_element(latex, display=display)
        except Exception as error:
            raise PluginError(f"{page.file.src_uri}: 无法转换公式 {latex!r}") from error
        # Decode the converter's numeric entities before the XML serializer escapes text.
        for element in math.iter():
            if element.text:
                element.text = unescape(element.text)
        return tostring(math, encoding="unicode")

    return FORMULA.sub(typeset, html)
