var capacitorTextToSpeech = (function (exports, core) {
    'use strict';

    const TextToSpeech = core.registerPlugin('TextToSpeech', {
        web: () => Promise.resolve().then(function () { return web; }).then(m => new m.TextToSpeechWeb()),
    });

    class TextToSpeechWeb extends core.WebPlugin {
        constructor() {
            super();
            this.speechSynthesis = null;
            if ('speechSynthesis' in window) {
                this.speechSynthesis = window.speechSynthesis;
                window.addEventListener('beforeunload', () => {
                    this.stop();
                });
            }
        }
        async speak(options) {
            if (!this.speechSynthesis) {
                this.throwUnsupportedError();
            }
            await this.stop();
            const speechSynthesis = this.speechSynthesis;
            const utterance = this.createSpeechSynthesisUtterance(options);
            return new Promise((resolve, reject) => {
                utterance.onend = () => {
                    resolve();
                };
                utterance.onerror = (event) => {
                    reject(event);
                };
                speechSynthesis.speak(utterance);
            });
        }
        async stop() {
            if (!this.speechSynthesis) {
                this.throwUnsupportedError();
            }
            this.speechSynthesis.cancel();
        }
        async getSupportedLanguages() {
            const voices = this.getSpeechSynthesisVoices();
            const languages = voices.map(voice => voice.lang);
            const filteredLanguages = languages.filter((v, i, a) => a.indexOf(v) == i);
            return { languages: filteredLanguages };
        }
        async getSupportedVoices() {
            const voices = this.getSpeechSynthesisVoices();
            return { voices };
        }
        async isLanguageSupported(options) {
            const result = await this.getSupportedLanguages();
            const isLanguageSupported = result.languages.includes(options.lang);
            return { supported: isLanguageSupported };
        }
        async openInstall() {
            this.throwUnimplementedError();
        }
        createSpeechSynthesisUtterance(options) {
            const voices = this.getSpeechSynthesisVoices();
            const utterance = new SpeechSynthesisUtterance();
            const { text, lang, rate, pitch, volume, voice } = options;
            if (voice) {
                utterance.voice = voices[voice];
            }
            if (volume) {
                utterance.volume = volume >= 0 && volume <= 1 ? volume : 1;
            }
            if (rate) {
                utterance.rate = rate >= 0.1 && rate <= 10 ? rate : 1;
            }
            if (pitch) {
                utterance.pitch = pitch >= 0 && pitch <= 2 ? pitch : 2;
            }
            if (lang) {
                utterance.lang = lang;
            }
            utterance.text = text;
            return utterance;
        }
        getSpeechSynthesisVoices() {
            if (!this.speechSynthesis) {
                this.throwUnsupportedError();
            }
            if (!this.supportedVoices || this.supportedVoices.length < 1) {
                this.supportedVoices = this.speechSynthesis.getVoices();
            }
            return this.supportedVoices;
        }
        async getSupportedEngines() {
            this.throwUnimplementedError();
        }
        async switchEngine(engineName) {
            this.throwUnimplementedError();
        }
        ;
        async getDefaults() {
            this.throwUnimplementedError();
        }
        ;
        throwUnsupportedError() {
            throw this.unavailable('SpeechSynthesis API not available in this browser.');
        }
        throwUnimplementedError() {
            throw this.unimplemented('Not implemented on web.');
        }
    }

    var web = /*#__PURE__*/Object.freeze({
        __proto__: null,
        TextToSpeechWeb: TextToSpeechWeb
    });

    exports.TextToSpeech = TextToSpeech;

    Object.defineProperty(exports, '__esModule', { value: true });

    return exports;

})({}, capacitorExports);
//# sourceMappingURL=plugin.js.map
