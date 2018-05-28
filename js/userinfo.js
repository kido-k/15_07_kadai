
function checkNewUser(data, user_id) {
    // 新規ユーザーの登録機能
    const key = data.key;
    const val = data.val();

    if (key == user_id) {
        $("#id").val(user_id);
        $("#name").val(val.name);
        $("#age").val(val.age);
        return true;
    }
    return false;
}