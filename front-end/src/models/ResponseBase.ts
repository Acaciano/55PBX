export default interface ResponseBase<T> {
    ok: boolean;
    data: T;
}