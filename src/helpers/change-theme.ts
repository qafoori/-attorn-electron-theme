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


import { Storage } from '@attorn/electron-storage';
import { AttornElectronTheme } from '../interfaces';
import { SETTING_PATH, DEFAULT_FOLDER_NAME } from '../constants';
import { createRootItems } from './create-root-items';

/**
 *
 * @param name the name of chosen theme
 * @returns {
 *  result: [boolean] if false, means there is no install theme called "name",
 *  root: the "css :root{}" string, then add it into your stylesheet
 * }
 */
export const changeTheme = (name: string): AttornElectronTheme.ChangeThemeResult => {
  const settingStorage = new Storage({ name: SETTING_PATH });
  const themesStorage = new Storage({ name: DEFAULT_FOLDER_NAME });
  const allInstalled = themesStorage.list();
  const exist = allInstalled.includes(name.concat('.json'));

  if (!exist) {
    return { result: false, root: '' };
  }

  settingStorage.update('activeTheme', name);
  const themeStorage = new Storage({ name: `${DEFAULT_FOLDER_NAME}/${name}` });
  const theme = <AttornElectronTheme.Theme>themeStorage.read();

  return {
    result: true,
    root: createRootItems(theme)
  }
}

