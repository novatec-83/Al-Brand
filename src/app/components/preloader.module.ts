import {CommonModule } from '@angular/common'

import { NgModule } from '@angular/core';
import { XHRBackend, RequestOptions } from '@angular/http';
import { HttpService } from '../services/http-service';
import { PreloaderService } from '../services/preloader-service';
import { PostService } from '../services/post-service';
import { PreloaderFull } from './preloader-full/preloader-full';
import { PreloaderSmall } from './preloader-small/preloader-small';


export function httpServiceFactory(backend: XHRBackend, defaultOptions: RequestOptions, preloaderService: PreloaderService) {
    return new HttpService(backend, defaultOptions, preloaderService);
}


@NgModule({
    declarations: [
        PreloaderFull,
        PreloaderSmall,
    ],
    imports: [
        CommonModule
    ],
    providers: [
        PreloaderService,
        PostService,
        {
            provide: HttpService,
            useFactory: httpServiceFactory,
            deps: [XHRBackend, RequestOptions, PreloaderService]
        }],
    exports:[
        PreloaderFull,
        PreloaderSmall,
    ]
})
export class PreloaderModule { }