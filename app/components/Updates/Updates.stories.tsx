import type { StoryObj } from '@storybook/react';
import { Updates } from './Updates';

export default {
    title: 'Updates',
    component: Updates,
};

type Story = StoryObj<typeof Updates>;

export const Primary: Story = {
    args: {
        updates: [{
            'version': '2.7.3',
            'pub_date': '2024-12-20T00:43:04+00:00',
            'url':
                'https://github.com/alinco8/ultimate-nokori-jikan-wakaru-yaatu/releases/download/v2.7.3/uljika.app.tar.gz',
            'signature':
                'dW50cnVzdGVkIGNvbW1lbnQ6IHNpZ25hdHVyZSBmcm9tIHRhdXJpIHNlY3JldCBrZXkKUlVSaUdleTRnQm5NbDM4dXVuamhWckJKTENWdE1BWm5wdGFJb29UUDZrYmdnVnpobVprMVRleG81bGhPTFcwUWxDRmJpdkpsZU12dWVsUFN0U0t6VUY0NG9uQXgyeVNNOUFVPQp0cnVzdGVkIGNvbW1lbnQ6IHRpbWVzdGFtcDoxNzM0NjU1Mzc3CWZpbGU6dWxqaWthLmFwcC50YXIuZ3oKU0NGK05HdVZZeGtZbkt1L2tvZy9rYkt5Y1lxbmRzdjBYQjl3K3VOT3RxU0ZrZFY0SkZlcEpaVnRhMndFenU1bkVuTFpFS1U0ZGM2SE9xZjNySFlVQWc9PQo=',
            'notes':
                '## [2.7.3](https://github.com/alinco8/ultimate-nokori-jikan-wakaru-yaatu/compare/v2.7.2...v2.7.3) (2024-12-20)\n\n###  :wrench: 修正\n\n* 日誌機能の日付が2024-12-18で固定されるバグを修正 ([439363a](https://github.com/alinco8/ultimate-nokori-jikan-wakaru-yaatu/commit/439363aa1bdcacb1e859adf7358e44f458ad703a))\n',
        }, {
            'version': '2.7.2',
            'pub_date': '2024-12-18T06:02:46+00:00',
            'url':
                'https://github.com/alinco8/ultimate-nokori-jikan-wakaru-yaatu/releases/download/v2.7.2/uljika.app.tar.gz',
            'signature':
                'dW50cnVzdGVkIGNvbW1lbnQ6IHNpZ25hdHVyZSBmcm9tIHRhdXJpIHNlY3JldCBrZXkKUlVSaUdleTRnQm5NbDNjbm0zWDVSWmNQQXFGQi9RMmpEWWxZMWdzNFRQWmVJZnRJNlNpaXo4VDhZb0l1QS9ERFZYeU42emdHOXpIKzVpclQvNU0vbnlEa1VaODFib1BNUVFnPQp0cnVzdGVkIGNvbW1lbnQ6IHRpbWVzdGFtcDoxNzM0NTAxNzU5CWZpbGU6dWxqaWthLmFwcC50YXIuZ3oKdUJCdHlxVGhpVU1NVnNGbmEzbGhvdEp6bGF1cXVGNTZQdFpMeUJQRzJoZHBLWW8yY2ZBemhESkltSDBtbU1mN2ZGV3VrRDc5MU0vQVFDSDh6MWx2QXc9PQo=',
            'notes':
                '## [2.7.2](https://github.com/alinco8/ultimate-nokori-jikan-wakaru-yaatu/compare/v2.7.1...v2.7.2) (2024-12-18)\n\n###  :wrench: 修正\n\n* ヘルプページの追加と色々 ([823c0e2](https://github.com/alinco8/ultimate-nokori-jikan-wakaru-yaatu/commit/823c0e2ae65899e7882274e904c514a66458ee8c))\n',
        }, {
            'version': '2.7.1',
            'pub_date': '2024-12-17T14:02:28+00:00',
            'url':
                'https://github.com/alinco8/ultimate-nokori-jikan-wakaru-yaatu/releases/download/v2.7.1/uljika.app.tar.gz',
            'signature':
                'dW50cnVzdGVkIGNvbW1lbnQ6IHNpZ25hdHVyZSBmcm9tIHRhdXJpIHNlY3JldCBrZXkKUlVSaUdleTRnQm5NbDVUQmdzV0Z6d1NSYXdoN1hqclRTRXd0MmxXU1BuQWVvRVJHN2lBSmEwOWQyOTlmbFY1NkNFME9UUjBOOTJDTHIrQjcxMGxtL0I3MWxYbkptb1NnL0FNPQp0cnVzdGVkIGNvbW1lbnQ6IHRpbWVzdGFtcDoxNzM0NDQ0MTQxCWZpbGU6dWxqaWthLmFwcC50YXIuZ3oKQ3dpT0tJQkFBL0NIaUt5WmNBSXpWajVTZXRGZUxzQmdkZWFhNkRHS1NYVmY1ZUdIcjNpNUhFNGtDSTYyVVpwVnlXM3hVNzZGSklyVEVsd2lHeGViQ0E9PQo=',
            'notes':
                '## [2.7.1](https://github.com/alinco8/ultimate-nokori-jikan-wakaru-yaatu/compare/v2.7.0...v2.7.1) (2024-12-17)\n\n###  :wrench: 修正\n\n* 画面になぜか「1」が出るバグを修正 ([6dfd0e1](https://github.com/alinco8/ultimate-nokori-jikan-wakaru-yaatu/commit/6dfd0e1aed4c2f42f493ad5aaa34dd0629009687))\n',
        }, {
            'version': '2.7.0',
            'pub_date': '2024-12-17T13:55:10+00:00',
            'url':
                'https://github.com/alinco8/ultimate-nokori-jikan-wakaru-yaatu/releases/download/v2.7.0/uljika.app.tar.gz',
            'signature':
                'dW50cnVzdGVkIGNvbW1lbnQ6IHNpZ25hdHVyZSBmcm9tIHRhdXJpIHNlY3JldCBrZXkKUlVSaUdleTRnQm5NbDA3NWVSQjZ6UzRSL0lEczhMby9WZGhmcm1scVM2UUg5RkFnOG50bVFLT0FNWmtZR0lEaUV1NFZidWdialRQZHFubVoray90VGxkSlhYQVZwRFBYblFNPQp0cnVzdGVkIGNvbW1lbnQ6IHRpbWVzdGFtcDoxNzM0NDQzNjk4CWZpbGU6dWxqaWthLmFwcC50YXIuZ3oKZi9IbXZhcnlKOFpPK1Y2c3ZTbktFeUp1TjROcXNpR21kQzkwdE1nc0VrbUdZQ2pYUjJNeWdha1NuMVNyb2xidWJYb2ZEeFVqVlIzUVhzWkI3dUNpQWc9PQo=',
            'notes':
                '## [2.7.0](https://github.com/alinco8/ultimate-nokori-jikan-wakaru-yaatu/compare/v2.6.1...v2.7.0) (2024-12-17)\n\n###  :sparkles: 新機能\n\n* 日誌機能の追加 ([351fdc4](https://github.com/alinco8/ultimate-nokori-jikan-wakaru-yaatu/commit/351fdc49da83c8143e4c3095c819f188ae7bb6da))\n\n###  :wrench: 修正\n\n* デザイン修正 ([73048d1](https://github.com/alinco8/ultimate-nokori-jikan-wakaru-yaatu/commit/73048d1cf1393818f7135dd22c850e06a897ccd1))\n',
        }, {
            'version': '2.6.1',
            'pub_date': '2024-12-12T12:16:57+00:00',
            'url':
                'https://github.com/alinco8/ultimate-nokori-jikan-wakaru-yaatu/releases/download/v2.6.1/uljika.app.tar.gz',
            'signature':
                'dW50cnVzdGVkIGNvbW1lbnQ6IHNpZ25hdHVyZSBmcm9tIHRhdXJpIHNlY3JldCBrZXkKUlVSaUdleTRnQm5NbDFHTGpHY2NhTVlVaitleGRSQVZPdTRpTit4SzJsWTJFWW1vQ1krUVdlaWtsZTl4ajIyT1FSb2k4VnRhSTZaK204OHRkQnRXWElUci9iRW5TUFJxMWcwPQp0cnVzdGVkIGNvbW1lbnQ6IHRpbWVzdGFtcDoxNzM0MDA1ODEwCWZpbGU6dWxqaWthLmFwcC50YXIuZ3oKU2RzRG0wS1VwMFBvM1NRNDhRUlEraVVJVVQwUWFVT05XV1ZyZEpyZ05hZEFXbEhDd05zaFNmWXM0TG4zek1jQXk0UlpIRUFueFlHK05Qd0ZNaUJYQ0E9PQo=',
            'notes':
                '## [2.6.1](https://github.com/alinco8/ultimate-nokori-jikan-wakaru-yaatu/compare/v2.6.0...v2.6.1) (2024-12-12)\n\n###  :wrench: 修正\n\n* バイナリ名の修正 ([#58](https://github.com/alinco8/ultimate-nokori-jikan-wakaru-yaatu/issues/58)) ([dafd9a1](https://github.com/alinco8/ultimate-nokori-jikan-wakaru-yaatu/commit/dafd9a1ba1919a4f7a30f26a1f2a127ec32b2dcb))\n',
        }, {
            'version': '2.6.0',
            'pub_date': '2024-12-11T05:32:26+00:00',
            'url':
                'https://github.com/alinco8/ultimate-nokori-jikan-wakaru-yaatu/releases/download/v2.6.0/uljika.app.tar.gz',
            'signature':
                'dW50cnVzdGVkIGNvbW1lbnQ6IHNpZ25hdHVyZSBmcm9tIHRhdXJpIHNlY3JldCBrZXkKUlVSaUdleTRnQm5NbDBWK0FUeG5HaU1FaXAvU0RzV3JPVnR4UmozY2FDbDN4ZmEwMStlWk12VWJHaGZEeDdNd2F6ZEg0aDduZHBqZ29FYk40TGpXZExQWFJ0TCs0d09KVWc0PQp0cnVzdGVkIGNvbW1lbnQ6IHRpbWVzdGFtcDoxNzMzODk1MTM5CWZpbGU6dWxqaWthLmFwcC50YXIuZ3oKdnFwQzNnYVlUeXU3cEtna0xWNW5hV0hrU050MmR5K1lqY3h0OHBkOCt3Z0lQdzBkZTI0TnlROHU5MVBzV0pHY28xZTJsMXltQ3RRQ2twSkt3WXArQlE9PQo=',
            'notes':
                '## [2.6.0](https://github.com/alinco8/ultimate-nokori-jikan-wakaru-yaatu/compare/v2.5.0...v2.6.0) (2024-12-11)\n\n###  :sparkles: 新機能\n\n* 自動起動機能を追加 ([#55](https://github.com/alinco8/ultimate-nokori-jikan-wakaru-yaatu/issues/55)) ([08caad6](https://github.com/alinco8/ultimate-nokori-jikan-wakaru-yaatu/commit/08caad6a79f78c79e941846a4d3bcc93958919c0))\n',
        }, {
            'version': '2.5.0',
            'pub_date': '2024-12-11T04:23:36+00:00',
            'url':
                'https://github.com/alinco8/ultimate-nokori-jikan-wakaru-yaatu/releases/download/v2.5.0/uljika.app.tar.gz',
            'signature':
                'dW50cnVzdGVkIGNvbW1lbnQ6IHNpZ25hdHVyZSBmcm9tIHRhdXJpIHNlY3JldCBrZXkKUlVSaUdleTRnQm5NbC9LUUFYd0JFNEw0SWNxMGVhYmdQc2lKRHgrVjRkSnVGL08rcXNzYmxSWlBXVFJQeWFjbDBzVHJaWVdGbEhvQ2pseXliQzBHQ2wyM2xob1UvUXowaHdFPQp0cnVzdGVkIGNvbW1lbnQ6IHRpbWVzdGFtcDoxNzMzODkxMDA5CWZpbGU6dWxqaWthLmFwcC50YXIuZ3oKamdGcHdKQ2FFVmhYS3lvbmNheVh6cHBaNjZRSENFYk0yeDZLTUVCMCtvUEVqLzhWaU5uelBUYkVnSFZIWm1kSGxESFpXNjlyWW5oc0Y1ekUydXczRHc9PQo=',
            'notes':
                '## [2.5.0](https://github.com/alinco8/ultimate-nokori-jikan-wakaru-yaatu/compare/v2.4.4...v2.5.0) (2024-12-11)\n\n###  :sparkles: 新機能\n\n* 設定画面の一新 ([#54](https://github.com/alinco8/ultimate-nokori-jikan-wakaru-yaatu/issues/54)) ([3d0f0c4](https://github.com/alinco8/ultimate-nokori-jikan-wakaru-yaatu/commit/3d0f0c40b69898a5a5abc6296f307d3bdfb2b104))\n\n###  :wrench: 修正\n\n* 著作権表示の追加 ([#53](https://github.com/alinco8/ultimate-nokori-jikan-wakaru-yaatu/issues/53)) ([51dcea9](https://github.com/alinco8/ultimate-nokori-jikan-wakaru-yaatu/commit/51dcea980ef1b0de507355142d1e894b81dae4e1))\n',
        }, {
            'version': '2.4.4',
            'pub_date': '2024-12-10T13:04:55+00:00',
            'url':
                'https://github.com/alinco8/ultimate-nokori-jikan-wakaru-yaatu/releases/download/v2.4.4/uljika.app.tar.gz',
            'signature':
                'dW50cnVzdGVkIGNvbW1lbnQ6IHNpZ25hdHVyZSBmcm9tIHRhdXJpIHNlY3JldCBrZXkKUlVSaUdleTRnQm5NbDdNbVZteTc5RXFnOEUrWFNqVUUxV1AyT1NQOHpmZjBJNjJJWTRpRlFVeXFpUEpkdndtN2ROT2xDbENnNVZSVGZkZHVFbC8yUU01YzRMdGVNbzYyZkFJPQp0cnVzdGVkIGNvbW1lbnQ6IHRpbWVzdGFtcDoxNzMzODM1ODg3CWZpbGU6dWxqaWthLmFwcC50YXIuZ3oKcXFqcVdXa3p6UnMyWnhlNlBqWThGU2NDV1VEQmNKWDZMbjVrNkFyNEtxV3IyRDBxZy91OXhPbkExd0dmYWgvdktqR2tEekdWaDYrRjJId283VVh6QXc9PQo=',
            'notes':
                '## [2.4.4](https://github.com/alinco8/ultimate-nokori-jikan-wakaru-yaatu/compare/v2.4.3...v2.4.4) (2024-12-10)\n\n###  :wrench: 修正\n\n* ページがスクロールできない問題を修正 ([#45](https://github.com/alinco8/ultimate-nokori-jikan-wakaru-yaatu/issues/45)) ([94dbf11](https://github.com/alinco8/ultimate-nokori-jikan-wakaru-yaatu/commit/94dbf11c3f2d74e5cb7264f7969461cfacd2d52d))\n',
        }, {
            'version': '2.4.3',
            'pub_date': '2024-12-03T15:58:24+00:00',
            'url':
                'https://github.com/alinco8/ultimate-nokori-jikan-wakaru-yaatu/releases/download/v2.4.3/uljika.app.tar.gz',
            'signature':
                'dW50cnVzdGVkIGNvbW1lbnQ6IHNpZ25hdHVyZSBmcm9tIHRhdXJpIHNlY3JldCBrZXkKUlVSaUdleTRnQm5NbDFRWXJBZnl4RlUvaDVlSzRCbnBiUmpmVitZR2x6WUFwSEV4aEsrRzhvVmJ5Z3QrQ1hqRGoraGM1TEZUVHZUZ1dWY21EdnEyQTNvTEc4ZE9qUENlVGdBPQp0cnVzdGVkIGNvbW1lbnQ6IHRpbWVzdGFtcDoxNzMzMjQxNDk3CWZpbGU6dWxqaWthLmFwcC50YXIuZ3oKeEZQZStJK3FaM1A1dU9uZWVBUXZjajE5blcwbWFPT1VQUkREUkRuTUQxUW9YUEEwOEpTbzg2YU5vYXY0bU5VMnJYSXQ2WGZpcWdZZGs2bXNHNUplQlE9PQo=',
            'notes':
                '## [2.4.3](https://github.com/alinco8/ultimate-nokori-jikan-wakaru-yaatu/compare/v2.4.2...v2.4.3) (2024-12-03)\n\n###  :wrench: 修正\n\n* アップデート後の再起動確認画面を削除 ([#29](https://github.com/alinco8/ultimate-nokori-jikan-wakaru-yaatu/issues/29)) ([d536807](https://github.com/alinco8/ultimate-nokori-jikan-wakaru-yaatu/commit/d536807c64681e272342de7812dda3ebf454726a))\n',
        }, {
            'version': '2.4.2',
            'pub_date': '2024-12-03T15:48:05+00:00',
            'url':
                'https://github.com/alinco8/ultimate-nokori-jikan-wakaru-yaatu/releases/download/v2.4.2/uljika.app.tar.gz',
            'signature':
                'dW50cnVzdGVkIGNvbW1lbnQ6IHNpZ25hdHVyZSBmcm9tIHRhdXJpIHNlY3JldCBrZXkKUlVSaUdleTRnQm5NbHlPYXZJbHFuV084UmJYS1ZqMy9lSHU3bEt6VWt3Ti9rNFRlaTdBeC9jSFVFaXV5dVplQmIyNncyTEFJWEFLTnFFaFU4eUxNaStvRENjMUl6dHlWbEFNPQp0cnVzdGVkIGNvbW1lbnQ6IHRpbWVzdGFtcDoxNzMzMjQwODc4CWZpbGU6dWxqaWthLmFwcC50YXIuZ3oKVStVN1RuTnRTcnhDMTh2cklRUG5WL1RiTWcvNWdTcVdrWCtESFA4dEp6aXlxRWVoQ3lnVVhua3NPcGxDR0IvTEdaTFVnWHBLUzZ5dzZFTHZCaDlGQlE9PQo=',
            'notes':
                '## [2.4.2](https://github.com/alinco8/ultimate-nokori-jikan-wakaru-yaatu/compare/v2.4.1...v2.4.2) (2024-12-03)\n\n###  :wrench: 修正\n\n* アップデートのタイトルが二回表示されてしまうバグを修正 ([#27](https://github.com/alinco8/ultimate-nokori-jikan-wakaru-yaatu/issues/27)) ([c75045f](https://github.com/alinco8/ultimate-nokori-jikan-wakaru-yaatu/commit/c75045f2b154c3c2bbc82943221c35d8f2b2c95f))\n',
        }, {
            'version': '2.4.1',
            'pub_date': '2024-12-03T15:41:38+00:00',
            'url':
                'https://github.com/alinco8/ultimate-nokori-jikan-wakaru-yaatu/releases/download/v2.4.1/uljika.app.tar.gz',
            'signature':
                'dW50cnVzdGVkIGNvbW1lbnQ6IHNpZ25hdHVyZSBmcm9tIHRhdXJpIHNlY3JldCBrZXkKUlVSaUdleTRnQm5NbHpOL1RGdjgramp6RCtDWUZHNWFKYlNRN0NsSGsvNWRzeHRLVHY4eEc3TzdKa0k4TGxsaXB3RTY3L1A1b0xpQ0hzSy9UQy9RTk1uMG1pOTZiZjBkTVFFPQp0cnVzdGVkIGNvbW1lbnQ6IHRpbWVzdGFtcDoxNzMzMjQwNDkxCWZpbGU6dWxqaWthLmFwcC50YXIuZ3oKWDBHNkU1SjBxSGNuM2VhcU9ZYWd5QW5lTGUrbE5HaTlPSWFDcVhlcjZlWFRHYU42OUVUam5URllMaHBKOE43TklJRHQvNXRiK01PTnFMZWJWY0x1QUE9PQo=',
            'notes':
                '## [2.4.1](https://github.com/alinco8/ultimate-nokori-jikan-wakaru-yaatu/compare/v2.4.0...v2.4.1) (2024-12-03)\n\n###  :wrench: 修正\n\n* 絵文字が:sparkles:のように表示されてしまうバグを修正 ([#25](https://github.com/alinco8/ultimate-nokori-jikan-wakaru-yaatu/issues/25)) ([5bca790](https://github.com/alinco8/ultimate-nokori-jikan-wakaru-yaatu/commit/5bca7900c6ee12f1371d9402754b6772ebc23d62))\n',
        }, {
            'version': '2.4.0',
            'pub_date': '2024-12-03T14:23:16+00:00',
            'url':
                'https://github.com/alinco8/ultimate-nokori-jikan-wakaru-yaatu/releases/download/v2.4.0/uljika.app.tar.gz',
            'signature':
                'dW50cnVzdGVkIGNvbW1lbnQ6IHNpZ25hdHVyZSBmcm9tIHRhdXJpIHNlY3JldCBrZXkKUlVSaUdleTRnQm5NbDAxUzd3cjVsTUpDcmkxWlN2OTZkMFcxWE1ZN3dyR05WdTB0RStibE1LVk9NSGJlcWhnVytxV1lSYlU2d0daQWNHTGtxRDFFclFIYU1ydjdSc05rRmdVPQp0cnVzdGVkIGNvbW1lbnQ6IHRpbWVzdGFtcDoxNzMzMjM1Nzg5CWZpbGU6dWxqaWthLmFwcC50YXIuZ3oKR0tnNzEwVUhNYndsTXJ6QTNzcFJqK0p1Sy92YktKYW1tSmVXSno4am9iaVV2c3JSL1lKcXRYd005SFQ2ZCtwZy9KV2VoQ1RPckdndWN4R1RXc2kxQ0E9PQo=',
            'notes':
                '## [2.4.0](https://github.com/alinco8/ultimate-nokori-jikan-wakaru-yaatu/compare/v2.3.1...v2.4.0) (2024-12-03)\n\n###  :sparkles: 新機能\n\n* 開発者ツール機能を追加 ([#18](https://github.com/alinco8/ultimate-nokori-jikan-wakaru-yaatu/issues/18)) ([e3ade09](https://github.com/alinco8/ultimate-nokori-jikan-wakaru-yaatu/commit/e3ade0970783c6951ba69c29d6198aee1467b6c1))\n',
        }, {
            'version': '2.3.1',
            'pub_date': '2024-11-29T05:54:22+00:00',
            'url':
                'https://github.com/alinco8/ultimate-nokori-jikan-wakaru-yaatu/releases/download/app-v2.3.1/uljika_aarch64.app.tar.gz',
            'signature':
                'dW50cnVzdGVkIGNvbW1lbnQ6IHNpZ25hdHVyZSBmcm9tIHRhdXJpIHNlY3JldCBrZXkKUlVSaUdleTRnQm5NbDBTZ2t1K296cWo2MlVodCs4V2Q0S1ZsQXZsVS9kR0M0K3U2QXk1WDFSdFoxbklHYnJ1bnBDR1cxZHdVWWU1bXVmTzBYaktpUG4vaGRGcEJscVIvNWdFPQp0cnVzdGVkIGNvbW1lbnQ6IHRpbWVzdGFtcDoxNzMyODU2NTQ2CWZpbGU6dWxqaWthLmFwcC50YXIuZ3oKWnBTZWxQREZJc3lKeGxKL3hFaE54aVdrY3NnR0Q2dDZmbHNoM2RPNkw1VFRTNi9zZnpHQ3lNM3NqeFFTWE4zbkVhMG1nQUNqZytiOFhkVWNqbWhOQlE9PQo=',
            'notes':
                '# 🔧  修正\r\n- デフォルトのテンプレートを修正（「設定をリセット」必須）',
        }, {
            'version': '2.3.0',
            'pub_date': '2024-11-29T03:20:14+00:00',
            'url':
                'https://github.com/alinco8/ultimate-nokori-jikan-wakaru-yaatu/releases/download/app-v2.3.0/uljika_aarch64.app.tar.gz',
            'signature':
                'dW50cnVzdGVkIGNvbW1lbnQ6IHNpZ25hdHVyZSBmcm9tIHRhdXJpIHNlY3JldCBrZXkKUlVSaUdleTRnQm5NbCtCRkVNZk4zZ01OOENBL3F5NWVWaW1RWWl2UDlPL015WFdOKy9yOFJLVmRoQS9zQ2oxWHhuZ3FqSXZCTncySU10Q3BtMFVIUktCOXA4cS84UWYvdVFzPQp0cnVzdGVkIGNvbW1lbnQ6IHRpbWVzdGFtcDoxNzMyODU0OTE2CWZpbGU6dWxqaWthLmFwcC50YXIuZ3oKYmpXYyswZi9yUG9vck9abzIwVTRQeksxaFI0QmtpZUFhOE5LZjNURjJKVW1URlBQN0VFN25CdkZQUUpxcFBIREZmUnpGK0NRNUkzSllxUEpINUJMQ0E9PQo=',
            'notes': '# ✨ 新機能\r\n- アプリを非表示にする機能を追加',
        }, {
            'version': '2.1.1',
            'pub_date': '2024-11-06T04:19:32+00:00',
            'url':
                'https://github.com/alinco8/ultimate-nokori-jikan-wakaru-yaatu/releases/download/app-v2.1.1/uljika_aarch64.app.tar.gz',
            'signature':
                'dW50cnVzdGVkIGNvbW1lbnQ6IHNpZ25hdHVyZSBmcm9tIHRhdXJpIHNlY3JldCBrZXkKUlVSaUdleTRnQm5NbC9vWEpzTzlvejZ1azR3NEFnT2t1VFVlUG1BZ2YyRUZoRUxVa3Y1Ylp6K3RIOUY2OWFLaEFoYTFZRWJHdWgxcURraTNsbWpMZ1VEVkxPbWw3aDhXUWdFPQp0cnVzdGVkIGNvbW1lbnQ6IHRpbWVzdGFtcDoxNzMyODQ0MTE5CWZpbGU6dWxqaWthLmFwcC50YXIuZ3oKVHVNZWZSeWVidU1qNXlMQjZUVFFBU3I2cC9IbERQQVByZlRjalJrY3ZjUlRPbGJUNHlubkowckhKZ0d5amZMU3FFYnI2WTZualRsYkExM2FWS1k2Qmc9PQo=',
            'notes':
                '## ✨ 新機能\r\n- 設定のリセット\r\n\r\n## 🔧 修正\r\n- 初回起動時に予定が空になるバグを修正\r\n',
        }, {
            'version': '2.1.0',
            'pub_date': '2024-11-06T03:47:13+00:00',
            'url':
                'https://github.com/alinco8/ultimate-nokori-jikan-wakaru-yaatu/releases/download/app-v2.1.0/uljika_aarch64.app.tar.gz',
            'signature':
                'dW50cnVzdGVkIGNvbW1lbnQ6IHNpZ25hdHVyZSBmcm9tIHRhdXJpIHNlY3JldCBrZXkKUlVSaUdleTRnQm5NbDdld1l1RUR3OFE2bVFSSGhrN3h5OEFwZ0xjZnlRVEpmK1o1RUxDSGpEczVSRXk4YnlRcmtzTXFMVnpMRmlVdzErN2l2dkdWNTF3NUhQNmZpa3B1WkFVPQp0cnVzdGVkIGNvbW1lbnQ6IHRpbWVzdGFtcDoxNzMwODY1Njk4CWZpbGU6dWxqaWthLmFwcC50YXIuZ3oKTC9lMjZyNkdJUGY3aWVRV3hydlFKWGNiNTZ6YVl4d2ROZk15Z1ByZ00yS21FRTk0ZHBUQ2FXaHRHOHFsRnd4QmQ1L0FsTEZ5cis4bnlscFZpR0c5Qmc9PQo=',
            'notes':
                '## 改善\r\n- 以前のカスタマイズのできないUIに戻した。初心者向け',
        }, {
            'version': '2.0.1',
            'pub_date': '2024-11-06T01:07:31+00:00',
            'url':
                'https://github.com/alinco8/ultimate-nokori-jikan-wakaru-yaatu/releases/download/app-v2.0.1/uljika_aarch64.app.tar.gz',
            'signature':
                'dW50cnVzdGVkIGNvbW1lbnQ6IHNpZ25hdHVyZSBmcm9tIHRhdXJpIHNlY3JldCBrZXkKUlVSaUdleTRnQm5NbHpLdEZXdjFFM3ZlWjZ6VmdtWmZRZ2pXbDFoRFIrWGxnTmpjK21uaVgvNCtVeE8yN3NlZjlGUjhjS3E0MFNHV3U1NzQydDZYNFJtZThOSWo5Tk5MM3c4PQp0cnVzdGVkIGNvbW1lbnQ6IHRpbWVzdGFtcDoxNzMwODYyNzkyCWZpbGU6dWxqaWthLmFwcC50YXIuZ3oKZFNZdC8vM0tVS2drdUJkSVJlWU5QWk43dWF2Z25WVFR5WC9RMC9jR1Bxckt0L1hWdEpxZjBuM3ZrYUlOWlloMG9WazV6a0NuRG5sWldZTVQwaUh6Qmc9PQo=',
            'notes': '## 💎 改善点\r\n- デフォルトのFormatterを変更',
        }, {
            'version': '2.0.0',
            'pub_date': '2024-11-05T15:18:26+00:00',
            'url':
                'https://github.com/alinco8/ultimate-nokori-jikan-wakaru-yaatu/releases/download/app-v2.0.0/uljika_aarch64.app.tar.gz',
            'signature':
                'dW50cnVzdGVkIGNvbW1lbnQ6IHNpZ25hdHVyZSBmcm9tIHRhdXJpIHNlY3JldCBrZXkKUlVSaUdleTRnQm5NbCtsclR1WDdhN0xrcWF2blcxOTE4L3JFZ0tkVTZwZGF4ZTZnUTAxVG1Zai9aMjZseW44UENDanhtL0RmL1FoeHNoSmhUQmJQc2FQc2NtaUcxeVBJaEFzPQp0cnVzdGVkIGNvbW1lbnQ6IHRpbWVzdGFtcDoxNzMwODUzNjEwCWZpbGU6dWxqaWthLmFwcC50YXIuZ3oKS2RmaXNXTFFFL0xHS2ZkUW5ZYzlIbGlPbVZRYlFDdVRkS2w3Ykt1SjRlNTZFUEFDdC9xOXp1TTh1NEtyUStEbmtOeTJramI1YmJZTEtPd2RhWWhhQ3c9PQo=',
            'notes': 'See the assets to download this version and install.',
        }, {
            'version': '1.0.5',
            'pub_date': '2024-07-19T04:52:39+00:00',
            'url':
                'https://github.com/alinco8/ultimate-nokori-jikan-wakaru-yaatu/releases/download/app-v1.0.5/_aarch64.app.tar.gz',
            'signature':
                'dW50cnVzdGVkIGNvbW1lbnQ6IHNpZ25hdHVyZSBmcm9tIHRhdXJpIHNlY3JldCBrZXkKUlVSaUdleTRnQm5NbHpkK2x5blYvb2ZpSlFNVmwzbUMrUHFGT2hkUGk5NWNtb2xNeHFOSiszKzVXS2lDOWlIdDRvYk9RMHhtcWZsUGwxRHY3elNESWNmWVRrMThxTmZXYndZPQp0cnVzdGVkIGNvbW1lbnQ6IHRpbWVzdGFtcDoxNzIxMTk2MTIwCWZpbGU644Ki44Or44OG44Kj44Oh44OD44OI44OO44Kz44Oq44K444Kr44Oz44Ov44Kr44Or44Ok44O844OELmFwcC50YXIuZ3oKeHM2aklhQ28zalBWcElML0ZSWnBhVUdZNFh6STBJMkdRaWRUUVZaT0cxaDZmM3VkNjl4RHcxT0YxRTcraUliaTRkMW14bzBTanY4ZW9VUll0d3E0Qmc9PQo=',
            'notes': 'See the assets to download this version and install.',
        }, {
            'version': '1.0.4',
            'pub_date': '2024-07-05T04:50:26+00:00',
            'url':
                'https://github.com/alinco8/ultimate-nokori-jikan-wakaru-yaatu/releases/download/app-v1.0.4/_aarch64.app.tar.gz',
            'signature':
                'dW50cnVzdGVkIGNvbW1lbnQ6IHNpZ25hdHVyZSBmcm9tIHRhdXJpIHNlY3JldCBrZXkKUlVSaUdleTRnQm5NbHh2ZVQ4TENtejdSSDBoR2ZXcHp0SjdocjFlNlBTZ3drazcrV1BqbUUrNTg3ODJ1T3phY0RUN1E1aEd1d3FPZWVyOFZvNVptOVlUS2lXTEJFL29jOEEwPQp0cnVzdGVkIGNvbW1lbnQ6IHRpbWVzdGFtcDoxNzIwMTUwNTA1CWZpbGU644Ki44Or44OG44Kj44Oh44OD44OI44OO44Kz44Oq44K444Kr44Oz44Ov44Kr44Or44Ok44O844OELmFwcC50YXIuZ3oKSFZPM0FqZWNtOG9IUUxtbDVqbGlKY0NuaGtyWlg0MEtIajNTdVl6cC9CMG81Z3RlNnMrQ000WVp1VWR0ZTVtbWtGSnpxOTM4RVVWVlB1T1Bwb2xiQ3c9PQo=',
            'notes': 'See the assets to download this version and install.',
        }, {
            'version': '1.0.3',
            'pub_date': '2024-06-19T01:57:24+00:00',
            'url':
                'https://github.com/alinco8/ultimate-nokori-jikan-wakaru-yaatu/releases/download/app-v1.0.3/_aarch64.app.tar.gz',
            'signature':
                'dW50cnVzdGVkIGNvbW1lbnQ6IHNpZ25hdHVyZSBmcm9tIHRhdXJpIHNlY3JldCBrZXkKUlVSaUdleTRnQm5NbCtGMHZKcThUdUQwbnJScEJ3N2Z0Vm9tMzJHRVlrTXlZT1NLVFN0dEJEemlxSEZwSkp3eEdibUNTRENXUUlmUFNybUdQdHJvY3VQM09HYkxKbUtib3c4PQp0cnVzdGVkIGNvbW1lbnQ6IHRpbWVzdGFtcDoxNzE4NzYyMTY2CWZpbGU644Ki44Or44OG44Kj44Oh44OD44OI44OO44Kz44Oq44K444Kr44Oz44Ov44Kr44Or44Ok44O844OELmFwcC50YXIuZ3oKWHhNZVRRWWNMaTlVZnNZckxLODVGd2djd2lROWcyYjVaZnRLbGJJNFovT0RQaUpKTTBxbWhRWTBQVWJYKzVXU0tTcGkyeEZWWEtabGEvRVI3K2Z1QkE9PQo=',
            'notes': 'See the assets to download this version and install.',
        }, {
            'version': '1.0.2',
            'pub_date': '2024-06-17T06:38:14+00:00',
            'url':
                'https://github.com/alinco8/ultimate-nokori-jikan-wakaru-yaatu/releases/download/app-v1.0.2/_aarch64.app.tar.gz',
            'signature':
                'dW50cnVzdGVkIGNvbW1lbnQ6IHNpZ25hdHVyZSBmcm9tIHRhdXJpIHNlY3JldCBrZXkKUlVSaUdleTRnQm5NbHlJenUxWDdFc21ZbUdhL05XUklPTTdIYml5ZDhSbjQ1bzU4TmJvZjltdnZZNG1FYVBjd3F5Njl6UENZOFFGYkhOREFFbHgrWW5rc0NzN3hheVZWNVFvPQp0cnVzdGVkIGNvbW1lbnQ6IHRpbWVzdGFtcDoxNzE4NjA2MjY1CWZpbGU644Ki44Or44OG44Kj44Oh44OD44OI44OO44Kz44Oq44K444Kr44Oz44Ov44Kr44Or44Ok44O844OELmFwcC50YXIuZ3oKdit1d2FlaWp6WXRFYXVScnVyOFBHTzFCd1RnMGd2K0I4SWJnaDh6MVJ2emRaSGpCbGRWaEQ5M3J1bmROYkFKNWxOMkcvMmlSOEV3VVdvWWJMMFdSQmc9PQo=',
            'notes': 'See the assets to download this version and install.',
        }, {
            'version': '1.0.1',
            'pub_date': '2024-06-17T04:31:15+00:00',
            'url':
                'https://github.com/alinco8/ultimate-nokori-jikan-wakaru-yaatu/releases/download/app-v1.0.1/_aarch64.app.tar.gz',
            'signature':
                'dW50cnVzdGVkIGNvbW1lbnQ6IHNpZ25hdHVyZSBmcm9tIHRhdXJpIHNlY3JldCBrZXkKUlVSaUdleTRnQm5NbCtwS1NtWEhGc0lZZ2xZNkhNRDdtUWpSNjNGSjhKYlBtMFNqa2sxNUR2TXQ2KzU5cVFkb2pVTTQ0UDd3L1VrSXZyUHFOeDdWT00rVUhvaXU4aGpheEE4PQp0cnVzdGVkIGNvbW1lbnQ6IHRpbWVzdGFtcDoxNzE4NTk4NDQ0CWZpbGU644Ki44Or44OG44Kj44Oh44OD44OI44OO44Kz44Oq44K444Kr44Oz44Ov44Kr44Or44Ok44O844OELmFwcC50YXIuZ3oKYU1jaEZYanRlUFlOZkxVTzVreVU0YURoMmY5SXdFdUxQZjZjdWFuSnd5RTVtRW9BRzIvUTNYOHB0U3hJYWtGMGdkZXFnZHp3WDVpL0NES1d5cExtQVE9PQo=',
            'notes': 'See the assets to download this version and install.',
        }, {
            'version': '1.0.0',
            'pub_date': '2024-06-17T04:04:09+00:00',
            'url':
                'https://github.com/alinco8/ultimate-nokori-jikan-wakaru-yaatu/releases/download/app-v1.0.0/_aarch64.app.tar.gz',
            'signature':
                'dW50cnVzdGVkIGNvbW1lbnQ6IHNpZ25hdHVyZSBmcm9tIHRhdXJpIHNlY3JldCBrZXkKUlVSaUdleTRnQm5NbCtpanFrOEpoUkgyMlRXMldVSlFaQnRKRFpmdWtzL1BYV0xxSlF5QXg3S1ZGMjIvQXdqZWNvN3FEc2ljVkdJRjlBSkl3azRMZGQrRWttL01JWXBYeHcwPQp0cnVzdGVkIGNvbW1lbnQ6IHRpbWVzdGFtcDoxNzE4NTk2OTc2CWZpbGU644Ki44Or44OG44Kj44Oh44OD44OI44OO44Kz44Oq44K444Kr44Oz44Ov44Kr44Or44Ok44O844OELmFwcC50YXIuZ3oKNEk4Vy9sUUF0b0FTMXJhejFMa1FNa3R0WHR0cGpVVWhhT0FNT1o3dEZMSGsvQkZHZzJYR3VydkVZNzBjSGtMS1N2bEZ1Q0FDRXplYy9iRDRpcXRpQ0E9PQo=',
            'notes': 'See the assets to download this version and install.',
        }, {
            'version': '0.0.5',
            'pub_date': '2024-06-14T01:53:51+00:00',
            'url':
                'https://github.com/alinco8/ultimate-nokori-jikan-wakaru-yaatu/releases/download/app-v0.0.5/_aarch64.app.tar.gz',
            'signature':
                'dW50cnVzdGVkIGNvbW1lbnQ6IHNpZ25hdHVyZSBmcm9tIHRhdXJpIHNlY3JldCBrZXkKUlVSaUdleTRnQm5NbDJQVjJvcDg4MkxXdTR1OFY2VjRSMmZlVEQvUFFSalFmS3YxYkFxcXpVbFhDNjd0UDFWN0N2TnpWSVZubkdEbEZFY01sc3dRQklzZVhBZFhWaDhFVWcwPQp0cnVzdGVkIGNvbW1lbnQ6IHRpbWVzdGFtcDoxNzE4MzI5OTMyCWZpbGU644Ki44Or44OG44Kj44Oh44OD44OI44OO44Kz44Oq44K444Kr44Oz44Ov44Kr44Or44Ok44O844OELmFwcC50YXIuZ3oKRWE1QjlNWUttSUZnU0o2NTNvSk5ia3NpbHBrRFlxTmZ1aTVYbU5ZRHRWK3ZSSUxlSWlrcDJ3OW1HTEVQRHBlbmlDbDRaRVQ4QTNhTjZ1QWNMRzBkQUE9PQo=',
            'notes': 'See the assets to download this version and install.',
        }, {
            'version': '0.0.4',
            'pub_date': '2024-06-12T03:46:26+00:00',
            'url':
                'https://github.com/alinco8/ultimate-nokori-jikan-wakaru-yaatu/releases/download/app-v0.0.4/_aarch64.app.tar.gz',
            'signature':
                'dW50cnVzdGVkIGNvbW1lbnQ6IHNpZ25hdHVyZSBmcm9tIHRhdXJpIHNlY3JldCBrZXkKUlVSaUdleTRnQm5NbC90T0VkcUJDNmdFbkliZmVaQk1vd05xQ25SY2xEVFF6dDgza0hOUVJIY3d2UEQxYUFWU3YrYXU0QlE0eGJ1dmJvLzlyNVQwRnViK0g5TnNtZjN2ZWdBPQp0cnVzdGVkIGNvbW1lbnQ6IHRpbWVzdGFtcDoxNzE4MTYzODk1CWZpbGU644Ki44Or44OG44Kj44Oh44OD44OI44OO44Kz44Oq44K444Kr44Oz44Ov44Kr44Or44Ok44O844OELmFwcC50YXIuZ3oKMDJnSWh2dHpaNG55cGFvV2hjTjNkRGI1bS9BTExoNUhxN0VNdWEvUTBHaUkxTlAwUDFsTlYyOWNsSWdrekRjWHpJTzlLZUFLaXhZbysvbXh4NCtwQ0E9PQo=',
            'notes': 'See the assets to download this version and install.',
        }, {
            'version': '0.0.3',
            'pub_date': '2024-06-10T03:57:45+00:00',
            'url':
                'https://github.com/alinco8/ultimate-nokori-jikan-wakaru-yaatu/releases/download/app-v0.0.3/_aarch64.app.tar.gz',
            'signature':
                'dW50cnVzdGVkIGNvbW1lbnQ6IHNpZ25hdHVyZSBmcm9tIHRhdXJpIHNlY3JldCBrZXkKUlVSaUdleTRnQm5NbHg3ZUVQaWIzTmVHSVIyQ2hTMVNwamVKakU4eVI1RHdlaE1SNmg3amdEN2dVQmJwK2psRGkzeVRjdEswZUg1YnpTNFd2WlNuSEdXamlEY2lHMjdpRUFBPQp0cnVzdGVkIGNvbW1lbnQ6IHRpbWVzdGFtcDoxNzE3OTkwNjg5CWZpbGU644Ki44Or44OG44Kj44Oh44OD44OI44OO44Kz44Oq44K444Kr44Oz44Ov44Kr44Or44Ok44O844OELmFwcC50YXIuZ3oKT2ZTNURZemZBbXJBNXovYmg2UmlrNzE3UG9IUnZWRGpLMCtzdzlWSkFHZEVBb2k1bjNEYmh2blVhK2hvdmdXMmVJblF1azNNLzlRVi93V2M5bW9nRGc9PQo=',
            'notes': '### アルティメットノコリジカンワカルヤーツ、ここにあり。',
        }],
    },
};
