pragma solidity >=0.7.0 <0.9.0;

contract Numbers {

    uint256 num = 0;

    function add(uint256 x, uint256 y) public {
        num = x + y;
    }

    function get() public view returns (uint256) {
        return num;
    }

}