// MIT License
//
// Copyright (c) 2021 Attorn Studio by qafoori
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.


// @ts-nocheck
import { FC } from 'react';
import { ipcRenderer } from 'electron';
import { AttornElectronTheme } from '@attorn/electron-theme';

export const ThemeWorker: FC = (): JSX.Element => {
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
