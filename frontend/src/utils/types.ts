import { SxProps, Theme } from '@mui/material';

export interface ISearchParams {
    location: string;
    frequency: number;
    keywords: string;
}

export enum ELanguage {
    ARABIC = 'lang_ar',
    CHINESE_SIMPLIFIED = 'lang_zh-CN',
    CHINESE_TRADITIONAL = 'lang_zh-TW',
    CZECH = 'lang_cs',
    DANISH = 'lang_da',
    DUTCH = 'lang_nl',
    ENGLISH = 'lang_en',
    ESTONIAN = 'lang_et',
    FINNISH = 'lang_fi',
    FRENCH = 'lang_fr',
    GERMAN = 'lang_de',
    GREEK = 'lang_el',
    HEBREW = 'lang_iw',
    HUNGARIAN = 'lang_hu',
    ICELANDIC = 'lang_is',
    ITALIAN = 'lang_it',
    JAPANESE = 'lang_ja',
    KOREAN = 'lang_ko',
    LATVIAN = 'lang_lv',
    LITHUANIAN = 'lang_lt',
    NORWEGIAN = 'lang_no',
    PORTUGUESE = 'lang_pt',
    POLISH = 'lang_pl',
    ROMANIAN = 'lang_ro',
    RUSSIAN = 'lang_ru',
    SPANISH = 'lang_es',
    SWEDISH = 'lang_sv',
    TURKISH = 'lang_tr',
}

export interface IResultData {
    result: string;
    timestamp: string;
}

export interface ISearchResponse extends ISearchParams {
    results: IResultData[];
    _id: string;
    __v?: number;
}

export interface ISearchResponseProps extends Pick<ISearchResponse, 'results'> {
    sx: SxProps<Theme>;
}

export interface ISearchResponseState
    extends Pick<ISearchResponse, 'results'> {}
