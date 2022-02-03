# Extended K-Sortable UID

This is a browser-friendly implementation of [ksuid](https://github.com/segmentio/ksuid) in JavaScript.
The implementation is extended to produce UIDs in descending order, which is beneficial in certain cases,
e.g. when used as a key for [KV Cloudflare worker storage](https://developers.cloudflare.com/workers/runtime-apis/kv#listing-keys) entries that should be listed in descending order.

Binary keys generated in ascending order per reference KSUID implementation are 20 bytes long, 
whereas extended KSUID are 21 byte long and are always starting with `61`, indicating that timestamp value
is calculated as a difference between maximum possible value (max 32bit unsigned integer) and seconds since `14e8`:

```sh
# KSUID - Ascending order
   4 bytes           16 bytes
 [ ][ ][ ][ ]  [ ][ ][ ]...[ ][ ][ ]
sec since 14e8        random bytes

# xKSUID - Descending order
1 byte   4 bytes           16 bytes
[ 61 ] [ ][ ][ ][ ]  [ ][ ][ ]...[ ][ ][ ]
 'z'   sec till MAX        random bytes
```

Text representation for KSUID is 27 characters long, and 28 characters long with xKSUID, starting with `z`:
```sh
# KSUID
24bxFgAT8RPOk01OWecxD8bcLKo

#xKSUID
zYS4GmVK9Hn2JHPota8SAOBQsPgR
```


## Benchmark
```sh
> xksuid@0.0.1 benchmark
> node benchmark.js

8 x Intel(R) Core(TM) i7-4770HQ CPU @ 2.20GHz

Running 100000 ops

3535.918315887451 ms 35.359183158874515 ns/op 28281.196302155477 ops/sec
```
