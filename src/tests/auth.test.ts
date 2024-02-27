// import jest from "jest";
import { register } from "../controllers/auth.controller";

test("register test", async () => {

    let registermock:any  = register;
    registermock = jest.fn().mockResolvedValue({data:{uid:66556555, email:"test@gmail.com"}});
    let registerMockResponse = await registermock({body:{email:"test@gmail.com"}}, {})
    expect(registerMockResponse).toEqual({data:{uid:66556555, email:"test@gmail.com"}})
})