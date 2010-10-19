module("Chapter 1");
test("isArray", function () {
    ok(typeof(isArray) === "function", "isArray() exists");
    ok(!isArray("asasas"), "rejects string");
    ok(!isArray({a: ""}), "rejects object");
    ok(!isArray(true), "rejects boolean");
    ok(isArray([1, 2, 3]), "accepts array");
});
test("isList", function () {
    ok(typeof(isList) === "function", "isList() exists");
});
test("isNullList", function () {
    ok(typeof(isNullList) === "function", "isNullList() exists");
    ok(!isNullList({}), "isNullList({}) is false");
    ok(!isNullList([1,2,3]), "isNullList({}) is false");
    ok(isNullList([]), "isNullList([]) is true");
});
test("isAtom", function () {
    ok(typeof(isAtom) === "function", "isAtom() exists");
    ok(!isAtom({}), "isAtom({}) false");
    ok(isAtom(true), "isAtom(boolean) ok");
    ok(isAtom("string"), "isAtom(string) ok");
    ok(isAtom(1234), "isAtom(number) ok");
});
test("car", function () {
    ok(typeof(car) === "function", "car() exists");
    ok(car([1, 2, 3]) === 1, "car of [1, 2, 3] is 1");
    ok(car([]) === undefined, "car of [] is undefined");
});
test("cdr", function () {
    ok(typeof(cdr) === "function", "cdr() exists");
    ok(cdr({}) === undefined, "cdr returns nullList if object is passed");
    ok(cdr([1, 2, 3])[1] === 3, "cdr([1, 2, 3])[1] === 3");
    ok(isNullList(cdr([])), "cdr of [] is []/nullList");
    ok(isNullList(cdr([1])), "cdr of [1] is []/nullList");
});
test("isEq", function () {
    ok(typeof(isEq) === "function", "isEq() exists");
    ok(isEq(1, 1), "1 is the same as 1");
    ok(!isEq(1, 2), "1 is not the same as 2");
});
test("cons", function () {
    ok(typeof(cons) === "function", "cons() exists");
    ok(cons() === undefined, "cons needs args");
    ok(!cons(undefined, []) && !cons("", ""), "rejects bad args");
    ok(car(cons(1, [])) === 1, "car(cons(1, [])) === 1");
});
module("Chapter 2");
test("isLat", function () {
    ok(typeof(isLat) === "function", "isLat() exists");
    ok(!isLat(123), "isLat rejects atoms");
    ok(!isLat({}), "isLat rejects objects");
    ok(isLat([]), "nullList is isLat");
    ok(isLat([1]), "list of atoms is isLat");
    ok(isLat([1, 2, "three"]), "list of atoms is isLat again");
    ok(!isLat([1, 2, "three", {a: "b"}]), "list of atoms and object is NOT isLat again");
    ok(!isLat([1, 2, "three", [1, 2, 3]]), "2D list is NOT isLat again");
});
test("isMember", function () {
    ok(typeof(isMember) === "function", "isMember() exists");
    ok(!isMember(), "rejects bad args");
    ok(isMember("atom", []) === false, "no match in a nullList");
    ok(isMember("atom", ["list", "with", "atom", "inside"]), "true if string is in list");
    ok(isMember("atom", [1, 2]) === false, "no match returns false");
});
module("Chapter 3");
test("rember", function () {
    ok(typeof(rember) === "function", "rember() exists");
    ok(!rember(), "rejects bad args");
    ok(isNullList(rember("test", [])), "[] returns nullList");
    ok(car(rember("test", ["test", "one"])) === "one", "removes the first occurance");
    ok(car(rember("test", [1, "test", "one"])) === 1, "removes the first occurance");
    ok(car(rember("test", ["test", "test"])) === "test", "removes only the first occurance");
});
test("firsts", function () {
    ok(typeof(firsts) === "function", "firsts() exists");
    ok(!firsts() && !firsts({}) && !firsts(""), "rejects bad args");
    ok(isNullList(firsts([])), "returns a null list is a null list is passed in");
    ok(car(firsts([["one", "two"]])) === "one", "car of the new list is correct");
    ok(firsts([[1, 2, 3], [99, 12, 11]])[1] === 99, "the second element of the firsts list is correct");
});
test("insertR", function () {
    ok(typeof(insertR) === "function", "insertR() exists");
    ok(insertR() === undefined, "rejects bad args");
    ok(insertR({}, {}, {}) === undefined, "rejects bad args");
    ok(isNullList(insertR(1, 2, [])), "nullList in nullList out");
    ok(insertR(2, 2, [1])[0] === 1, "no match returns same list");
    ok(insertR(2, 1, [1])[1] === 2, "match inserts nu after 1st occurance in list");
    ok(insertR(5, 4, [1,2,3,4,6,7])[5] === 6, "match inserts nu after 1st occurance in list");
});
test("insertL", function () {
    ok(typeof(insertL) === "function", "insertL() exists");
    ok(insertL() === undefined, "rejects bad args");
    ok(insertL({}, {}, {}) === undefined, "rejects bad args");
    ok(isNullList(insertR(1, 2, [])), "nullList in nullList out");
    ok(insertL(2, 2, [1])[0] === 1, "no match returns same list");
    ok(insertL(2, 1, [1])[0] === 2, "match inserts nu before 1st occurance in list");
    ok(insertL(5, 4, [1,2,3,4,6,7])[3] === 5, "match inserts nu before 1st occurance in list");
});
test("subst", function () {
    var tVar;
    ok(typeof(subst) === "function", "subst() exists");
    ok(subst() === undefined, "rejects bad args");
    ok(subst({}, {}, {}) === undefined, "rejects bad args");
    ok(isNullList(subst(1, 2, [])), "nullList in nullList out");
    ok(subst(2, 2, [1])[0] === 1, "no match returns same list");
    ok(subst(1, 2, [2])[0] === 1, "nu replaces old");
    tVar = subst(1, 2, [0,2,2]);
    ok(tVar[0] === 0 && tVar[1] === 1 && tVar[2] === 2, "nu replaces old");
});
test("subst2", function () {
    ok(typeof(subst2) === "function", "subst2() exists");
    ok(subst2() === undefined, "rejects bad args");
    ok(isNullList(subst2(1, 2, 3, [])), "nullList in nullList out");
    ok(subst2(2, 2, 3, [1])[0] === 1, "no match returns same list");
    ok(subst2(1, 0, 5, [0, 2, 3])[0] === 1, "o1 replaced")
    ok(subst2(1, 5, 0, [0, 2, 3])[0] === 1, "o2 replaced")
});
test("multiRember", function () {
    var t = [1, 2, 1], r;
    ok(typeof(multiRember) === "function", "multiRember exists");
    ok(multiRember() === undefined, "rejects bad args");
    ok(isNullList(multiRember("", [])), "nullList in nullList out");
    r = multiRember(1, t);
    ok(r[0] === 2 && r[1] === undefined, "removes correct elements");
    t = [1, 1, 2, 1];
    r = multiRember(1, t);
    ok(r[0] === 2 && r[1] === undefined, "removes correct elements");
    t = ["coffee", "cup", "tea", "cup", "and", "hick", "cup"];
    r = multiRember("cup", t);
    ok(r.join(" ") === "coffee tea and hick", "correct atoms removed");
});
test("multiInsertR", function () {
    var t = [0, 2, 0], r;
    ok(typeof(multiInsertR) === "function", "multiInsertR exists");
    ok(multiInsertR() === undefined, "rejects bad args");
    ok(isNullList(multiInsertR("", "", [])), "nullList in nullList out");
    r = multiInsertR(1, 0, t);
    ok(r[1] === 1 && r[4] === 1, "correct atoms replaced");
});
