function isOverEighteen (age) {
    if (age >= 18) {
        console.log("You are 18 over")
    } else if (age == 17) {
        console.log("Wait one more year")
    } else {
        console.log("You are not adault")
    }
}
isOverEighteen(16);
isOverEighteen(17);
isOverEighteen(18);