# Plone Utilities

![Plone logo](https://github.com/plone/plone-vs-snippets/raw/master/images/plone-logo-128.png)

- [plone.org (Community)](https://plone.org)

This extension provides several utilities to work with Plone sites.

## Visual Studio Code Snippets for Plone

Currently, this extension provides a good set of XML-Registry and Supermodel Snippets, as well as Python Snippets.
You also have useful `plone.autoform` and ZCML permission Snippets to set up fieldsets and custom widgets.

It also provides Snippets for Volto Block View and Edit components, as well as Volto block configuration, Volto block schema and Volto schema enhancers.

### Plone XML (supermodel) Snippets for VS Code

![Plone XML Snippets for VS Code](https://github.com/plone/plone-vs-snippets/raw/master/images/vs-code-snippets-xml.gif)

### Plone Python (plone.schema) Snippets for VS Code

![Plone Python Snippets for VS Code](https://github.com/plone/plone-vs-snippets/raw/master/images/vs-code-snippets-python.gif)

### Volto Snippets for VS Code

![Volto Snippets for VS Code](https://github.com/plone/plone-vs-snippets/raw/master/images/vs-code-snippets-volto.gif)

## ZCML an TAL/ZPT Language Configuration and Formatter for VSCode

ZCML is an XML extension used to configure Zope applications. It is used extensively in [Plone](https://plone.org).

Formatting ZCML is hard and we have never been satisfied by existing formatters. To solve that, [Alessandro Pisa](https://github.com/ale-rt) created [zpretty](https://github.com/collective/zpretty/) a _very opinionated_ ZCML formatter.

This extension integrates `zpretty` into VSCode to format your ZCML.

The code of this add-on is based on [VSCode Custom Local Formatters](https://github.com/jkillian/vscode-custom-local-formatters). We extracted the XML language definition and grammar from VSCode itself and use them to create the ZCML language in VSCode.

The extension includes configuration settings (with sane defaults), to provide the absolute path of your `zpretty` executable and the options passed to it.

If you have any questions or want to provide feedback, please add a [GitHub Issue](https://github.com/plone/plone-vs-utilities/issues)

[zpretty](https://github.com/collective/zpretty/) also provides an XML formatter, which is very useful for formatting Zope Page Templates.

This extension also provides language configuration for ZPT files (TAL language), and a file formatter to get pretty output.

## Install

This extension is already in the official Extension Marketplace and can be installed directly from VS Code.

### Manual Install

To install it manually in your VS Code editor, check out this repository and symlink it under the name "plone" into your extensions directory (on Linux usually: `~/.vscode/extensions/`).

You have to reload the editor window or restart VS Code to load the snippets.

## Configure

This add-on has several configuration options that can be modified using VS Code settings:

- zcmlLanguage.zprettypath: path to `zpretty`. By default it tries to run using _uvx_: uvx zpretty.

- zcmlLanguage.zprettyoptions: options to format ZCML code. By default it passes the _-z_ option to run `zpretty` in ZCML mode.

- talLanguage.zprettyoptions. options to format XML code. By default it passes nothing, to let `zpretty` guess the file format.

## Contribute

If you have ideas to improve this extension, let us know! You can add an issue in this repository or, even better, make a pull request with your improvements.

We enthusiastically welcome any help in improving the quality and usefulness of these snippets.

## Extension integration

This extension replaces two other extensions that were providing the same features and were used by community members:

- [plone-vs-snippets](https://github.com/plone/plone-vs-snippets) by @MrTango
- [zcmlLanguageConfiguration](https://github.com/erral/erral.erralZcmlLanguageConfiguration) by @erral

We thank them for their work!
