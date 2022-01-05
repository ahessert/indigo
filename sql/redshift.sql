DROP TABLE public.blocks;

CREATE TABLE public.blocks (
	timestamp VARCHAR(32),
    number integer,
    hash varchar(128),
 	parent_hash varchar(128),
 	nonce varchar(32),
 	sha3_uncles varchar(128),
 	logs_bloom varchar(546),
 	transactions_root varchar(128),
 	state_root varchar(128),
 	receipts_root varchar(128),
 	miner varchar(128),
 	difficulty numeric,
 	total_difficulty VARCHAR(32),
 	size INTEGER,
 	extra_data varchar(128),
 	gas_limit integer,
 	gas_used integer,
 	transaction_count integer,
 	base_fee_per_gas BIGINT)

 DISTKEY(timestamp)
 SORTKEY(timestamp);

COPY dev.public.blocks FROM 's3://open-source-analytics/eth/blocks.csv' IAM_ROLE 'arn:aws:iam::754091198799:role/service-role/AmazonRedshift-CommandsAccessRole-20211210T164120' FORMAT AS CSV DELIMITER ',' QUOTE '"' REGION AS 'us-east-1';

--CREATE USER andrewhessert WITH PASSWORD 'nz$fzdFZD^and1';

--GRANT ALL ON DATABASE dev TO andrewhessert;