---
description: CSVファイルの解析方法
---

# CSV Analysis

CSVファイルを解析するためのガイドです。

## 全データの読み込み

```sql
SELECT * FROM 'data.csv';
```

## 特定の列を選択

```sql
SELECT column1, column2, column3
FROM 'data.csv';
```

## 行のフィルタリング

特定の条件に一致する行のみを取得:

```sql
SELECT *
FROM 'data.csv'
WHERE column1 = 'value';
```

複数条件でフィルタリング:

```sql
SELECT *
FROM 'data.csv'
WHERE column1 = 'value'
  AND column2 > 100;
```

## 列と行の組み合わせフィルタリング

```sql
SELECT column1, column2
FROM 'data.csv'
WHERE column1 LIKE '%keyword%'
  AND column3 IS NOT NULL;
```

## 行番号によるフィルタリング

特定の行範囲を取得 (例: 11〜20行目):

```sql
SELECT *
FROM (
    SELECT *, row_number() OVER () AS rn
    FROM 'data.csv'
)
WHERE rn BETWEEN 11 AND 20;
```

先頭N行をスキップして取得:

```sql
SELECT *
FROM (
    SELECT *, row_number() OVER () AS rn
    FROM 'data.csv'
)
WHERE rn > 100;
```

## 追加のSQL機能

他の機能が必要な場合のみ公式ドキュメントを参照してください。

**参考ドキュメント**:

- [SQL Introduction](https://duckdb.org/docs/sql/introduction)
- [CSV Import](https://duckdb.org/docs/data/csv/overview)
