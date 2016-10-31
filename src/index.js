'use strict';

 import rp from 'request-promise'

 class SkyBiometryModule {
   constructor(client) {
     this.client = client;
   }
 }
 class SkyBiometryFaces extends SkyBiometryModule {
   DETECT_ENDPOINT = '/faces/detect'
   RECOGNIZE_ENDPOINT = '/faces/recognize'
   GROUP_ENDPOINT = '/faces/group'
   TRAIN_ENDPOINT = '/faces/train'

   detect(params) {
     return this.client.makeRequest('POST', this.DETECT_ENDPOINT, params)
   }

   recognize(params) {
     return this.client.makeRequest('GET', this.RECOGNIZE_ENDPOINT, params)
   }

   group(params) {
     return this.client.makeRequest('GET', this.GROUP_ENDPOINT, params)
   }

   train(params) {
     return this.client.makeRequest('GET', this.TRAIN_ENDPOINT, params)
   }
 }

 class SkyBiometryTags extends SkyBiometryModule {
   GET_ENDPOINT = '/tags/get'
   ADD_ENDPOINT = '/tags/add'
   SAVE_ENDPOINT = '/tags/save'
   REMOVE_ENDPOINT = '/tags/remove'

   get(params) {
     return this.client.makeRequest('GET', this.GET_ENDPOINT, params)
   }
   add(params) {
     return this.client.makeRequest('GET', this.ADD_ENDPOINT, params)
   }
   save(params) {
     return this.client.makeRequest('GET', this.SAVE_ENDPOINT, params)
   }
   remove(params) {
     return this.client.makeRequest('GET', this.REMOVE_ENDPOINT, params)
   }
 }

 class SkyBiometryAccount extends SkyBiometryModule {
   USERS_ENDPOINT = '/account/users'
   NAMESPACES_ENDPOINT = '/account/namespaces'
   LIMITS_ENDPOINT = '/account/limits'
   AUTHENTICATE_ENDPOINT = '/account/authenticate'

   users(params) {
     return this.client.makeRequest('GET', this.USERS_ENDPOINT, params)
   }
   namespaces(params) {
     return this.client.makeRequest('GET', this.NAMESPACES_ENDPOINT, params)
   }
   limits(params) {
     return this.client.makeRequest('GET', this.LIMITS_ENDPOINT, params)
   }
   authenticate(params) {
     return this.client.makeRequest('GET', this.AUTHENTICATE_ENDPOINT, params)
   }
 }

 export default class SkyBiometryClient {
   BASE_URL = 'http://api.skybiometry.com/fc'

   constructor(apiKey, apiSecret) {
     if (!apiKey || !apiSecret) {
       throw new Error('Must provide apiKey and apiSecret')
     }
     this.apiKey = apiKey
     this.apiSecret = apiSecret
     this.baseUrl = this.BASE_URL

     this.faces = new SkyBiometryFaces(this)
     this.tags = new SkyBiometryTags(this)
     this.account = new SkyBiometryAccount(this)
   }

   _buildRequestUrl(endpoint) {
     return this.baseUrl + endpoint
   }

   makeRequest(method, endpoint, body) {
     const uri = this._buildRequestUrl(endpoint)

     const options = {
       method,
       uri,
       qs: {
         api_key: this.apiKey,
         api_secret: this.apiSecret,
         ...body,
       },
       json: true,
     }

     return rp(options)
   }
 }
