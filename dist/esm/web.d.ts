import { WebPlugin } from '@capacitor/core';
import type { SpeechSynthesisEngine, TextToSpeechPlugin, TTSOptions } from './definitions';
export declare class TextToSpeechWeb extends WebPlugin implements TextToSpeechPlugin {
    private speechSynthesis;
    private supportedVoices;
    constructor();
    speak(options: TTSOptions): Promise<void>;
    stop(): Promise<void>;
    getSupportedLanguages(): Promise<{
        languages: string[];
    }>;
    getSupportedVoices(): Promise<{
        voices: SpeechSynthesisVoice[];
    }>;
    isLanguageSupported(options: {
        lang: string;
    }): Promise<{
        supported: boolean;
    }>;
    openInstall(): Promise<void>;
    private createSpeechSynthesisUtterance;
    private getSpeechSynthesisVoices;
    getSupportedEngines(): Promise<{
        engines: SpeechSynthesisEngine[];
    }>;
    switchEngine(engineName: {
        engineName: string;
    }): Promise<void>;
    getDefaults(): Promise<{
        engine: string;
        voice: string;
        language: string;
    }>;
    private throwUnsupportedError;
    private throwUnimplementedError;
}
