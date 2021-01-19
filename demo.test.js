jest.mock('./demo'); // 模拟demo
import {fetchData} from './demo';

const {getNumber} = jest.requireActual('./demo');

/*test("测试 generateConfig函数", () => {
  expect(generateConfig()).toMatchSnapshot({
    time: expect.any(Date),
  });
});

test("测试 generateAnotherConfig函数", () => {
    expect(generateAnotherConfig()).toMatchInlineSnapshot(`
    Object {
      "port": 8080,
      "server": "http://localhost",
      "time": "2019",
    }
  `);
});*/

test('fetchData 测试', () => {
    return fetchData().then(data => {
        expect(eval(data)).toEqual('123');
    });
});
test('getNumber 测试', () => {
    expect(getNumber()).toEqual(123);
});
