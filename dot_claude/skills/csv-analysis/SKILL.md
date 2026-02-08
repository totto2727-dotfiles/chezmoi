---
name: csv-analyzing
description: Guide for querying and filtering CSV files using DuckDB SQL
---

# CSV Analysis

A guide for analyzing CSV files.

## Load All Data

```sql
SELECT * FROM 'data.csv';
```

## Select Specific Columns

```sql
SELECT column1, column2, column3
FROM 'data.csv';
```

## Filter Rows

Retrieve only rows matching a specific condition:

```sql
SELECT *
FROM 'data.csv'
WHERE column1 = 'value';
```

Filter with multiple conditions:

```sql
SELECT *
FROM 'data.csv'
WHERE column1 = 'value'
  AND column2 > 100;
```

## Combined Column and Row Filtering

```sql
SELECT column1, column2
FROM 'data.csv'
WHERE column1 LIKE '%keyword%'
  AND column3 IS NOT NULL;
```

## Filter by Row Number

Retrieve a specific range of rows (e.g., rows 11-20):

```sql
SELECT *
FROM (
    SELECT *, row_number() OVER () AS rn
    FROM 'data.csv'
)
WHERE rn BETWEEN 11 AND 20;
```

Skip the first N rows:

```sql
SELECT *
FROM (
    SELECT *, row_number() OVER () AS rn
    FROM 'data.csv'
)
WHERE rn > 100;
```

## Additional SQL Features

Refer to the official documentation only when you need other features.

**Reference Documentation**:

- [SQL Introduction](https://duckdb.org/docs/sql/introduction)
- [CSV Import](https://duckdb.org/docs/data/csv/overview)
