module.exports = {
    disableEmoji: true,
    format: '{type}({scope}): {subject}',
    list: [
        'build',
        'ci',
        'docs',
        'feat',
        'fix',
        'perf',
        'refactor',
        'style',
        'test',
    ],
    maxMessageLength: 64,
    minMessageLength: 3,
    questions: [
        'type',
        'scope',
        'subject',
        'body',
        'breaking',
        'issues',
        'lerna',
    ],
    scopes: [],
    types: {
        build: {
            description:
                'ビルドシステムや外部依存関係に影響を与える変更（例: npm）',
            value: 'build',
        },
        ci: {
            description:
                '継続的インテグレーション（CI）設定ファイルやスクリプトの変更（例: GithubActions）',
            value: 'ci',
        },
        docs: {
            description: 'ドキュメントのみの変更',
            value: 'docs',
        },
        feat: {
            description: '新しい機能',
            value: 'feat',
        },
        fix: {
            description: 'バグ修正',
            value: 'fix',
        },
        perf: {
            description: 'パフォーマンスを向上させるコードの変更',
            value: 'perf',
        },
        refactor: {
            description: 'バグ修正や機能追加を伴わないコードの変更',
            value: 'refactor',
        },
        style: {
            description:
                'コードの意味に影響を与えない変更（空白、フォーマット、セミコロンの欠落など）',
            value: 'style',
        },
        test: {
            description: '不足しているテストの追加や既存テストの修正',
            value: 'test',
        },
        messages: {
            type: 'コミットする変更の種類を選択してください:',
            customScope: 'この変更が影響する範囲を選択してください:',
            subject: '変更内容を簡潔に、命令形で記述してください:\n',
            body: '変更内容を詳しく記述してください:\n ',
            breaking: '互換性に影響を及ぼす変更を記述してください:\n',
            footer: 'このコミットで解決するIssue（例: #123）:',
            confirmCommit: 'このコミットが影響を与えたパッケージ\n',
        },
    },
};
