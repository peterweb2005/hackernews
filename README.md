# intro

- 2 README.md in 2 projects, but this doc is the main (more coverage)
- serve http request with hackernews posts  
api definition refer: src/index.ts  
- most business (difficult) logic in services classes in service folder

## run

### install

```cmd
npm i
```

TODO may need resolve vulnerabilities

### start

```cmd
npm start
```

## ENHANCE

- failover, "must do" but no time:
- - http handler, only notify error, frontend may retry
- - app service, may have "service-side retry" by conditions
- data (class & graphql schema) duplicated /w frontend,  
can use shared project
- filter & sort can be in frontend?
- http get data from hacker news should background task,  
ie: when data outdated, response last data, start bg task to update

## BONUS thought

- paging by scroll
- - each page 10 items, together with the filtering feature,  
may get many page from hacker news (eg: >100 comments)
- - the difficult part is frontend, only need time to do

- react native
- - only need time to do
