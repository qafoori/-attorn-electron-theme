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


import { AttornElectronTheme } from '../interfaces';
import { CSSSupportedColors } from '../constants/css-supported-colors';


/**
 * 
 * @param theme the theme object
 * @returns css roots
 */
export const createRootItems = (theme: AttornElectronTheme.Theme): string => {
  /**
   * Get keys and values from user theme object
   */
  const objNames = Object.keys(theme);
  const objValues = Object.values(theme);


  /**
   * css root string
   */
  let root = '';


  /**
   * make the root items and add theme to root string
   */
  objNames.forEach((item, index) => {
    // get the associated value
    const associatedValue = objValues[index];

    // check if there was not a pound sign as the first letter, add it
    const initializedValue =
      CSSSupportedColors.includes(associatedValue) || associatedValue.substr(0, 1) === '#'
        ? associatedValue
        : '#'.concat(associatedValue);

    // make the root item
    root += `\n--${item}: ${initializedValue};`
  })


  /**
   * then return the root items i made
   * should be something like below
   *  --accentColor: #2d2d2d;
   *  --buttonsBack: white;
   */
  return root;
}
