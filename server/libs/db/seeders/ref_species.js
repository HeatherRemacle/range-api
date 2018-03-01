//
// MyRA
//
// Copyright © 2018 Province of British Columbia
//
// Licensed under the Apache License, Version 2.0 (the License);
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
// http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an AS IS BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
//
// Created by Jason Leach on 2018-02-27.
//

/* eslint-env es6 */

'use strict';

/* eslint-disable no-param-reassign */

module.exports = {
  up: async (queryInterface) => {
    const ref = [
      {
        name: 'Alder',
        type: 'Shrub',
      }, {
        name: 'Antelope-Brush',
        type: 'Shrub',
      }, {
        name: 'Birch, bog',
        type: 'Shrub',
      }, {
        name: 'Bitterbrush',
        type: 'Shrub',
      }, {
        name: 'Ceanothus, Snowbrush',
        type: 'Shrub',
      }, {
        name: 'Ceanothus, Redstem',
        type: 'Shrub',
      }, {
        name: 'Cherry, Choke',
        type: 'Shrub',
      }, {
        name: 'Cherry, Pin',
        type: 'Shrub',
      }, {
        name: 'Cinquefoil, Shrubby',
        type: 'Shrub',
      }, {
        name: 'Dogwood, Red-osier',
        type: 'Shrub',
      }, {
        name: 'Ninebark',
        type: 'Shrub',
      }, {
        name: 'Oceanspray',
        type: 'Shrub',
      }, {
        name: 'Raspberry sp.',
        type: 'Shrub',
      }, {
        name: 'Rose, Prickly',
        type: 'Shrub',
      }, {
        name: 'Rose, Woods',
        type: 'Shrub',
      }, {
        name: 'Sagebrush, Big',
        type: 'Shrub',
      }, {
        name: 'Sagebrush, Prairie',
        type: 'Shrub',
      }, {
        name: 'Saskatoon',
        type: 'Shrub',
      }, {
        name: 'Snowberry',
        type: 'Shrub',
      }, {
        name: 'Sumac',
        type: 'Shrub',
      }, {
        name: 'Trembling Aspen',
        type: 'Shrub',
      }, {
        name: 'Twinberry, Black',
        type: 'Shrub',
      }, {
        name: 'Twinberry, Red',
        type: 'Shrub',
      }, {
        name: 'Willow spp',
        type: 'Shrub',
      }, {
        name: 'Other',
        type: 'Shrub',
      }];

    ref.forEach((data) => {
      data.created_at = new Date();
      data.updated_at = new Date();
      data.active = true;
    });

    await queryInterface.bulkInsert('ref_species', ref, {});
  },
  down: async (queryInterface) => {
    await queryInterface.bulkDelete('ref_species', null, {});
  },
};
