import {fetchData} from './fetchData';

/* //使用回调函数
test('fetchData', (done) => {
    fetchData((data) => {
        console.log(data);
        expect(data).toEqual({
            name: 'bjstdmngbdr01.thoughtworks.com',
            os: 'windows',
            status: 'idle',
            type: 'physical',
            ip: '192.168.1.102',
            location: '/var/lib/cruise-agent',
            resources: [
                'Firefox',
                'Safari',
                'Ubuntu',
                'Chrome',
                'Firefox',
                'Safari',
                'Ubuntu',
                'Chrome',
                'Firefox',
                'Safari',
                'Ubuntu',
                'Chrome',
                'Firefox'
            ],
            id: 1
        });
        done()
    });
});*/
/*test('fetchData', (done) => {

    return fetchData()
    .catch(e=>{ // 如果请求成功的话，catch就不会执行，会导致测试通过，所以要使用expect.assertions(1)
        expect(e.toString().indexOf('404')>-1).toBe(true)
    })
});*/
it('fetchData', async (done) => {
    expect.assertions(1)//要求下面的expect必须要有1个执行
    return fetchData().catch(e=>{ // 如果请求成功的话，catch就不会执行，会导致测试通过，所以要使用expect.assertions(1)
        console.log(e);
        debugger
        expect(e.toString().indexOf('404')>-1).toBe(true)
    })
});
