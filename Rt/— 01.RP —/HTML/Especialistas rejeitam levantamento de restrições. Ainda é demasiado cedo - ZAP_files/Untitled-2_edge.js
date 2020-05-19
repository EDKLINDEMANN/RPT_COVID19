/**
 * Adobe Edge: symbol definitions
 */
(function($, Edge, compId){
//images folder
var im='images/';

var fonts = {};
var opts = {
    'gAudioPreloadPreference': 'auto',

    'gVideoPreloadPreference': 'auto'
};
var resources = [
];
var symbols = {
"stage": {
    version: "4.0.1",
    minimumCompatibleVersion: "4.0.1",
    build: "4.0.1.365",
    baseState: "Base State",
    scaleToFit: "none",
    centerStage: "none",
    initialState: "Base State",
    gpuAccelerate: false,
    resizeInstances: false,
    content: {
            dom: [
            {
                id: 'fundo',
                type: 'image',
                rect: ['0', '0','369px','600px','auto', 'auto'],
                fill: ["rgba(0,0,0,0)",im+"fundo.jpg",'0px','0px']
            },
            {
                id: 'NAVEGUE',
                type: 'image',
                rect: ['0', '0','300px','600px','auto', 'auto'],
                fill: ["rgba(0,0,0,0)",im+"NAVEGUE.png",'0px','0px']
            },
            {
                id: 'TIT',
                type: 'image',
                rect: ['0', '0','300px','600px','auto', 'auto'],
                fill: ["rgba(0,0,0,0)",im+"TIT.png",'0px','0px']
            },
            {
                id: 'BG',
                type: 'image',
                rect: ['0', '600px','300px','600px','auto', 'auto'],
                fill: ["rgba(0,0,0,0)",im+"BG.jpg",'0px','0px']
            },
            {
                id: 'LOGO',
                type: 'image',
                rect: ['0px', '600px','300px','600px','auto', 'auto'],
                fill: ["rgba(0,0,0,0)",im+"LOGO.png",'0px','0px']
            },
            {
                id: 'DEF',
                type: 'image',
                rect: ['0', '0','300px','600px','auto', 'auto'],
                fill: ["rgba(0,0,0,0)",im+"DEF.png",'0px','0px']
            },
            {
                id: 'EQUI',
                type: 'image',
                rect: ['0', '-5','300px','600px','auto', 'auto'],
                fill: ["rgba(0,0,0,0)",im+"EQUI.png",'0px','0px']
            },
            {
                id: 'CRESC',
                type: 'image',
                rect: ['0', '0','300px','600px','auto', 'auto'],
                fill: ["rgba(0,0,0,0)",im+"CRESC.png",'0px','0px']
            },
            {
                id: 'BERMA',
                type: 'image',
                rect: ['0', '0px','300px','600px','auto', 'auto'],
                fill: ["rgba(0,0,0,0)",im+"BERMA.png",'0px','0px']
            }],
            symbolInstances: [

            ]
        },
    states: {
        "Base State": {
            "${_DEF}": [
                ["style", "top", '12px'],
                ["style", "opacity", '0'],
                ["style", "left", '0px']
            ],
            "${_NAVEGUE}": [
                ["style", "top", '9px'],
                ["style", "opacity", '0'],
                ["style", "left", '0px']
            ],
            "${_CRESC}": [
                ["style", "top", '12px'],
                ["style", "opacity", '0'],
                ["style", "left", '0px']
            ],
            "${_BG}": [
                ["style", "top", '600px'],
                ["style", "left", '0px']
            ],
            "${_BERMA}": [
                ["style", "top", '600px'],
                ["style", "left", '0px']
            ],
            "${_fundo}": [
                ["style", "left", '0px'],
                ["style", "top", '0px']
            ],
            "${_Stage}": [
                ["color", "background-color", 'rgba(255,255,255,1)'],
                ["style", "width", '300px'],
                ["style", "height", '600px'],
                ["style", "overflow", 'hidden']
            ],
            "${_LOGO}": [
                ["style", "top", '600px'],
                ["style", "height", '600px'],
                ["style", "left", '0px'],
                ["style", "width", '300px']
            ],
            "${_TIT}": [
                ["style", "top", '12px'],
                ["style", "opacity", '0'],
                ["style", "left", '0px']
            ],
            "${_EQUI}": [
                ["style", "top", '12px'],
                ["style", "opacity", '0'],
                ["style", "left", '0px']
            ]
        }
    },
    timelines: {
        "Default Timeline": {
            fromState: "Base State",
            toState: "",
            duration: 27250,
            autoPlay: true,
            timeline: [
                { id: "eid17", tween: [ "style", "${_BG}", "left", '0px', { fromValue: '0px'}], position: 6339, duration: 0 },
                { id: "eid25", tween: [ "style", "${_DEF}", "left", '0px', { fromValue: '0px'}], position: 6913, duration: 0 },
                { id: "eid9", tween: [ "style", "${_fundo}", "top", '0px', { fromValue: '0px'}], position: 0, duration: 0 },
                { id: "eid7", tween: [ "style", "${_TIT}", "opacity", '1', { fromValue: '0'}], position: 250, duration: 250 },
                { id: "eid29", tween: [ "style", "${_EQUI}", "top", '0px', { fromValue: '12px'}], position: 13086, duration: 250 },
                { id: "eid16", tween: [ "style", "${_NAVEGUE}", "opacity", '1', { fromValue: '0'}], position: 2800, duration: 216 },
                { id: "eid22", tween: [ "style", "${_BG}", "top", '0px', { fromValue: '600px'}], position: 6339, duration: 483 },
                { id: "eid35", tween: [ "style", "${_CRESC}", "opacity", '1', { fromValue: '0'}], position: 20148, duration: 250 },
                { id: "eid39", tween: [ "style", "${_CRESC}", "opacity", '0', { fromValue: '1'}], position: 26500, duration: 252 },
                { id: "eid1", tween: [ "style", "${_TIT}", "left", '0px', { fromValue: '0px'}], position: 250, duration: 0 },
                { id: "eid11", tween: [ "style", "${_fundo}", "left", '-67px', { fromValue: '0px'}], position: 0, duration: 6339 },
                { id: "eid15", tween: [ "style", "${_NAVEGUE}", "top", '0px', { fromValue: '9px'}], position: 2800, duration: 216 },
                { id: "eid34", tween: [ "style", "${_CRESC}", "top", '0px', { fromValue: '12px'}], position: 20148, duration: 250 },
                { id: "eid21", tween: [ "style", "${_LOGO}", "top", '0px', { fromValue: '600px'}], position: 6339, duration: 483 },
                { id: "eid58", tween: [ "style", "${_LOGO}", "top", '-293px', { fromValue: '0px'}], position: 26935, duration: 315 },
                { id: "eid19", tween: [ "style", "${_LOGO}", "left", '0px', { fromValue: '0px'}], position: 6339, duration: 0 },
                { id: "eid57", tween: [ "style", "${_LOGO}", "left", '-22px', { fromValue: '0px'}], position: 26935, duration: 315 },
                { id: "eid6", tween: [ "style", "${_TIT}", "top", '0px', { fromValue: '12px'}], position: 250, duration: 250 },
                { id: "eid23", tween: [ "style", "${_DEF}", "top", '0px', { fromValue: '12px'}], position: 6913, duration: 250 },
                { id: "eid56", tween: [ "style", "${_LOGO}", "width", '344px', { fromValue: '300px'}], position: 26935, duration: 315 },
                { id: "eid55", tween: [ "style", "${_LOGO}", "height", '688px', { fromValue: '600px'}], position: 26935, duration: 315 },
                { id: "eid36", tween: [ "style", "${_CRESC}", "left", '0px', { fromValue: '0px'}], position: 20148, duration: 0 },
                { id: "eid31", tween: [ "style", "${_EQUI}", "left", '0px', { fromValue: '0px'}], position: 13086, duration: 0 },
                { id: "eid30", tween: [ "style", "${_EQUI}", "opacity", '1', { fromValue: '0'}], position: 13086, duration: 250 },
                { id: "eid33", tween: [ "style", "${_EQUI}", "opacity", '0', { fromValue: '1'}], position: 19500, duration: 375 },
                { id: "eid24", tween: [ "style", "${_DEF}", "opacity", '1', { fromValue: '0'}], position: 6913, duration: 250 },
                { id: "eid28", tween: [ "style", "${_DEF}", "opacity", '0', { fromValue: '1'}], position: 12500, duration: 371 },
                { id: "eid61", tween: [ "style", "${_BERMA}", "left", '0px', { fromValue: '0px'}], position: 6339, duration: 0 },
                { id: "eid62", tween: [ "style", "${_BERMA}", "top", '0px', { fromValue: '600px'}], position: 6339, duration: 483 },
                { id: "eid13", tween: [ "style", "${_NAVEGUE}", "left", '0px', { fromValue: '0px'}], position: 3016, duration: 0 }            ]
        }
    }
}
};


Edge.registerCompositionDefn(compId, symbols, fonts, resources, opts);

/**
 * Adobe Edge DOM Ready Event Handler
 */
$(window).ready(function() {
     Edge.launchComposition(compId);
});
})(jQuery, AdobeEdge, "EDGE-15260056");
