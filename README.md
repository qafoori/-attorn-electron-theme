## Getting started

  

The `@attorm/electron-theme` is created to theming  electron projects. With this package you have the ability to create, install, uninstall and change themes and immediately apply them into your UI.  
  
Because in `Attorn Studio`, we wanted our users to be able to customize their interface, we decided to create this package.


You can also use it in your electron projects by reading these documents and understanding how `@attorm/electron-theme` works.

  

## Installation

Using yarn (strongly recommended):

```bash
yarn add @attorn/electron-theme
```

Or using npm:

```bash
npm i @attorn/electron-theme
```

  

  

## HOW TO USE
We have a special workflow in this package that you can imagine a life cycle about. The following explanations make this clear:
1. When your app is ready to be displayed, you will read the installed themes from storage (`ipcMain`).
2. Identify the theme selected in the user settings and create a `css root` from it (`ipcMain`).
3. You pass the `css root` to the renderer and the renderer adds it to the stylesheet (`ipcRenderer`)..

These are the things that happen every time you application is opened. But then you have some helpers that can do the followings:

 - [x] Install new themes in user storage.
 - [x] Remove user-installed themes.
 - [x] Get a list of installed themes (regardless of whether they were installed by the user or you created them by default for your project)
 - [x] Make a new selection from the list of themes.

Now that you have dived into it and realized its workflow, it is time to read the following examples so that you can use this package.

We assume that you are building your application with react. But please think outside the box. You can modify these examples in your renderer method and use this package no matter what you are using in the renderer (including Simple JavaScript, React, Angular, Vue or etc).
So let's dive into react examples.

### 1. Initialize default themes
First you need some default themes. Something like this:
```ts
import { AttornElectronTheme } from  '@attorn/electron-theme';

const defaultDark: AttornElectronTheme.Themes = {
   name: 'default-dark',
   theme: { background: 'black', color: 'white'}
}
const defaultLight: AttornElectronTheme.Themes = {
   name: 'default-light',
   theme: { background: 'light', color: 'black'}
}

export const themes = [defaultDark, defaultLight];
```

Second in your `main` (where you make an instance of electron `BrowserWindow` class), add a new listener called `before-ready-to-show` or anything else you want. 
Then use `sender` inside it to send `css root` to renderer. We will make  `get-css-root` listener in renderer in next step.

```ts
import { ipcMain } from  'electron';
import { initializeTheme } from  '@attorn/electron-theme';
import { themes } from '../path-to-your-themes';

ipcMain.on('before-ready-to-show', ({ sender }) => {
   const { allThemes, activeTheme, root } = initializeTheme(themes);
   // in here we have two extra results (allThemes and activeTheme). we do not use theme in these examples but you can use theme if you want.
   sender.send('get-css-root', root);
})
```
Then in your entry point of your renderer, do something like this:
```ts
import { FC, useEffect, useState } from 'react';
import { ipcRenderer } from  'electron';
import { addThemeToStylesheet } from  '@attorn/electron-theme';

export const AppEntryPoint: FC = (): JSX.Element => {
   const [didMount, setDidMount] =  useState<boolean>(false);
   
   ipcRenderer.on('get-css-root', (_, root) => {
      setDidMount(true);
      addThemeToStylesheet(root);
   });
   
   useEffect(() =>  ipcRenderer.send('before-ready-to-show'), []);
   
   return didMount ? <p>My App</p> : <>loading...</>;
}
```

That's all for the first steps. You now have multiple default themes.

### 2. Changing them
In order to change themes, you will need another listener in your `main`.  Then use `sender` inside it to send outcomes to renderer. We will make  `gchange-theme-result` listener in renderer in next step.

```ts
import { ipcMain } from  'electron';
import { changeTheme } from  '@attorn/electron-theme';

ipcMain.on('change-theme', ({ sender }, themeName: string) => {
   const outcomes = changeTheme(themeName)
   // the outcome is something like this:
   // { result: true, root: string }
   // if outcomes.result is "false", that means there is no installed themes here called "themeName"
   sender.send('change-theme-result', outcomes);
})
```
Well, create a component like this somewhere in your renderer. In this component you need some buttons (the number of themes installed) to change theme.
```ts
import { FC } from 'react';
import { ipcRenderer } from 'electron';

export const ThemeChanger: FC = (): JSX.Element => {
   const changeTo = (name: string) => ipcRenderer.send('change-theme', name);
   ipcRenderer.on('change-theme-result', (_, msg) => console.log(msg))

   return (<>
      <button onClick={() => changeTo('default-dark')}>Default Dark</button>
      <button onClick={() => changeTo('default-light')}>Default Light</button>
   </>)
}
```
And yes, that's all you need to do for change themes.


### 3. Install and uninstall themes
If you, like `Attorn Studio`, think that your users should be able to customize your app to a great extent, you need to introduce new themes or, like apps like VSCode, Atom or `Attorn Studio`, have an online system, which allows users to create their own themes and make them available to the public.
In this example you will see how you can implement this process using this package.

First you need two new listeners. One for install (`install-theme`) and another for uninstall (`uninstall-theme`). You can also combine these two listeners together by passing a flag to specify if user wants to install or uninstall theme. But anyway, here is the example you can follow:

```ts
import { ipcMain } from  'electron';
import { installTheme, uninstallTheme, AttornElectronTheme } from  '@attorn/electron-theme';

ipcMain.on('install-theme', (_, { name, theme }: AttornElectronTheme.Themes) => {
   installTheme({ name, theme });
});
ipcMain.on('uninstall-theme', (_, theme: AttornElectronTheme.Themes) => {
   uninstallTheme(theme.name);
});
```

And in your renderer you can have something like this:
```ts
import { FC } from 'react';
import { ipcRenderer } from  'electron';
import { AttornElectronTheme } from '@attorn/electron-theme';

export const ThemeWorker: FC = ():  JSX.Element => {
   // suppose you got this object from a server
   const mockThemes: AttornElectronTheme.Themes[] = [
      { name: 'theme-0', theme: { background: 'red', color: 'black' } },
      { name: 'theme-1', theme: { background: 'black', color: 'red' } },
   ]

   const install = (theme: AttornElectronTheme.Themes) => ipcRenderer.send('install-theme', theme);
   const uninstall = (theme: AttornElectronTheme.Themes) => ipcRenderer.send('uninstall-theme', theme);

   return (<>
      <button onClick={() => install(mockThemes[0])}>install theme-0</button>
      <button onClick={() => install(mockThemes[1])}>install theme-1</button>

      <button onClick={() => uninstall(mockThemes[0])}>uninstall theme-0</button>
      <button onClick={() => uninstall(mockThemes[1])}>uninstall theme-1</button>
   </>)
}
```

### License

The `@attorn/electron-storage` is [MIT licensed](https://github.com/attorn/-attorn-electron-theme/blob/main/LICENSE)
