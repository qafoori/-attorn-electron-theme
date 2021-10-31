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


import { getAllInstalledThemes, getActiveTheme, createDefaultThemes, createRootItems } from '.';
import { AttornElectronTheme } from '../interfaces';

/**
 * Use this helper function to initialize default themes and then get
 * all installed themes and as the last step add the installed theme into your stylesheet
 * @param defaultThemes An array of all defaults themes you defined constantly in you app.
 * @returns {
 *  allThemes: all installed themes (including default themes and installed themes),
 *  activeTheme: the preferred theme or the last theme
 *  root: the "css :root" that you can add into your stylesheet
 * }
 */
export const initializeTheme = <T extends AttornElectronTheme.Theme = AttornElectronTheme.Theme>(
  defaultThemes: AttornElectronTheme.Themes<T>[]
) => {
  createDefaultThemes(defaultThemes);
  const allThemes = getAllInstalledThemes();
  const activeTheme = getActiveTheme(allThemes);
  const root = createRootItems(activeTheme.theme);

  return {
    allThemes,
    activeTheme,
    root
  }
}
