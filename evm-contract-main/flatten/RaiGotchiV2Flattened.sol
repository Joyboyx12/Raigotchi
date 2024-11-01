// Sources flattened with hardhat v2.22.6 https://hardhat.org

// SPDX-License-Identifier: AGPL-3.0-only AND MIT AND UNLICENSED

// File @api3/airnode-protocol/contracts/rrp/interfaces/IAuthorizationUtilsV0.sol@v0.14.2

// Original license: SPDX_License_Identifier: MIT
pragma solidity ^0.8.0;

interface IAuthorizationUtilsV0 {
    function checkAuthorizationStatus(
        address[] calldata authorizers,
        address airnode,
        bytes32 requestId,
        bytes32 endpointId,
        address sponsor,
        address requester
    ) external view returns (bool status);

    function checkAuthorizationStatuses(
        address[] calldata authorizers,
        address airnode,
        bytes32[] calldata requestIds,
        bytes32[] calldata endpointIds,
        address[] calldata sponsors,
        address[] calldata requesters
    ) external view returns (bool[] memory statuses);
}


// File @api3/airnode-protocol/contracts/rrp/interfaces/ITemplateUtilsV0.sol@v0.14.2

// Original license: SPDX_License_Identifier: MIT
pragma solidity ^0.8.0;

interface ITemplateUtilsV0 {
    event CreatedTemplate(
        bytes32 indexed templateId,
        address airnode,
        bytes32 endpointId,
        bytes parameters
    );

    function createTemplate(
        address airnode,
        bytes32 endpointId,
        bytes calldata parameters
    ) external returns (bytes32 templateId);

    function getTemplates(bytes32[] calldata templateIds)
        external
        view
        returns (
            address[] memory airnodes,
            bytes32[] memory endpointIds,
            bytes[] memory parameters
        );

    function templates(bytes32 templateId)
        external
        view
        returns (
            address airnode,
            bytes32 endpointId,
            bytes memory parameters
        );
}


// File @api3/airnode-protocol/contracts/rrp/interfaces/IWithdrawalUtilsV0.sol@v0.14.2

// Original license: SPDX_License_Identifier: MIT
pragma solidity ^0.8.0;

interface IWithdrawalUtilsV0 {
    event RequestedWithdrawal(
        address indexed airnode,
        address indexed sponsor,
        bytes32 indexed withdrawalRequestId,
        address sponsorWallet
    );

    event FulfilledWithdrawal(
        address indexed airnode,
        address indexed sponsor,
        bytes32 indexed withdrawalRequestId,
        address sponsorWallet,
        uint256 amount
    );

    function requestWithdrawal(address airnode, address sponsorWallet) external;

    function fulfillWithdrawal(
        bytes32 withdrawalRequestId,
        address airnode,
        address sponsor
    ) external payable;

    function sponsorToWithdrawalRequestCount(address sponsor)
        external
        view
        returns (uint256 withdrawalRequestCount);
}


// File @api3/airnode-protocol/contracts/rrp/interfaces/IAirnodeRrpV0.sol@v0.14.2

// Original license: SPDX_License_Identifier: MIT
pragma solidity ^0.8.0;



interface IAirnodeRrpV0 is
    IAuthorizationUtilsV0,
    ITemplateUtilsV0,
    IWithdrawalUtilsV0
{
    event SetSponsorshipStatus(
        address indexed sponsor,
        address indexed requester,
        bool sponsorshipStatus
    );

    event MadeTemplateRequest(
        address indexed airnode,
        bytes32 indexed requestId,
        uint256 requesterRequestCount,
        uint256 chainId,
        address requester,
        bytes32 templateId,
        address sponsor,
        address sponsorWallet,
        address fulfillAddress,
        bytes4 fulfillFunctionId,
        bytes parameters
    );

    event MadeFullRequest(
        address indexed airnode,
        bytes32 indexed requestId,
        uint256 requesterRequestCount,
        uint256 chainId,
        address requester,
        bytes32 endpointId,
        address sponsor,
        address sponsorWallet,
        address fulfillAddress,
        bytes4 fulfillFunctionId,
        bytes parameters
    );

    event FulfilledRequest(
        address indexed airnode,
        bytes32 indexed requestId,
        bytes data
    );

    event FailedRequest(
        address indexed airnode,
        bytes32 indexed requestId,
        string errorMessage
    );

    function setSponsorshipStatus(address requester, bool sponsorshipStatus)
        external;

    function makeTemplateRequest(
        bytes32 templateId,
        address sponsor,
        address sponsorWallet,
        address fulfillAddress,
        bytes4 fulfillFunctionId,
        bytes calldata parameters
    ) external returns (bytes32 requestId);

    function makeFullRequest(
        address airnode,
        bytes32 endpointId,
        address sponsor,
        address sponsorWallet,
        address fulfillAddress,
        bytes4 fulfillFunctionId,
        bytes calldata parameters
    ) external returns (bytes32 requestId);

    function fulfill(
        bytes32 requestId,
        address airnode,
        address fulfillAddress,
        bytes4 fulfillFunctionId,
        bytes calldata data,
        bytes calldata signature
    ) external returns (bool callSuccess, bytes memory callData);

    function fail(
        bytes32 requestId,
        address airnode,
        address fulfillAddress,
        bytes4 fulfillFunctionId,
        string calldata errorMessage
    ) external;

    function sponsorToRequesterToSponsorshipStatus(
        address sponsor,
        address requester
    ) external view returns (bool sponsorshipStatus);

    function requesterToRequestCountPlusOne(address requester)
        external
        view
        returns (uint256 requestCountPlusOne);

    function requestIsAwaitingFulfillment(bytes32 requestId)
        external
        view
        returns (bool isAwaitingFulfillment);
}


// File @api3/airnode-protocol/contracts/rrp/requesters/RrpRequesterV0.sol@v0.14.2

// Original license: SPDX_License_Identifier: MIT
pragma solidity ^0.8.0;

/// @title The contract to be inherited to make Airnode RRP requests
contract RrpRequesterV0 {
    IAirnodeRrpV0 public immutable airnodeRrp;

    /// @dev Reverts if the caller is not the Airnode RRP contract.
    /// Use it as a modifier for fulfill and error callback methods, but also
    /// check `requestId`.
    modifier onlyAirnodeRrp() {
        require(msg.sender == address(airnodeRrp), "Caller not Airnode RRP");
        _;
    }

    /// @dev Airnode RRP address is set at deployment and is immutable.
    /// RrpRequester is made its own sponsor by default. RrpRequester can also
    /// be sponsored by others and use these sponsorships while making
    /// requests, i.e., using this default sponsorship is optional.
    /// @param _airnodeRrp Airnode RRP contract address
    constructor(address _airnodeRrp) {
        airnodeRrp = IAirnodeRrpV0(_airnodeRrp);
        IAirnodeRrpV0(_airnodeRrp).setSponsorshipStatus(address(this), true);
    }
}


// File @openzeppelin/contracts/utils/Context.sol@v4.9.6

// Original license: SPDX_License_Identifier: MIT
// OpenZeppelin Contracts (last updated v4.9.4) (utils/Context.sol)

pragma solidity ^0.8.0;

/**
 * @dev Provides information about the current execution context, including the
 * sender of the transaction and its data. While these are generally available
 * via msg.sender and msg.data, they should not be accessed in such a direct
 * manner, since when dealing with meta-transactions the account sending and
 * paying for execution may not be the actual sender (as far as an application
 * is concerned).
 *
 * This contract is only required for intermediate, library-like contracts.
 */
abstract contract Context {
    function _msgSender() internal view virtual returns (address) {
        return msg.sender;
    }

    function _msgData() internal view virtual returns (bytes calldata) {
        return msg.data;
    }

    function _contextSuffixLength() internal view virtual returns (uint256) {
        return 0;
    }
}


// File @openzeppelin/contracts/access/Ownable.sol@v4.9.6

// Original license: SPDX_License_Identifier: MIT
// OpenZeppelin Contracts (last updated v4.9.0) (access/Ownable.sol)

pragma solidity ^0.8.0;

/**
 * @dev Contract module which provides a basic access control mechanism, where
 * there is an account (an owner) that can be granted exclusive access to
 * specific functions.
 *
 * By default, the owner account will be the one that deploys the contract. This
 * can later be changed with {transferOwnership}.
 *
 * This module is used through inheritance. It will make available the modifier
 * `onlyOwner`, which can be applied to your functions to restrict their use to
 * the owner.
 */
abstract contract Ownable is Context {
    address private _owner;

    event OwnershipTransferred(address indexed previousOwner, address indexed newOwner);

    /**
     * @dev Initializes the contract setting the deployer as the initial owner.
     */
    constructor() {
        _transferOwnership(_msgSender());
    }

    /**
     * @dev Throws if called by any account other than the owner.
     */
    modifier onlyOwner() {
        _checkOwner();
        _;
    }

    /**
     * @dev Returns the address of the current owner.
     */
    function owner() public view virtual returns (address) {
        return _owner;
    }

    /**
     * @dev Throws if the sender is not the owner.
     */
    function _checkOwner() internal view virtual {
        require(owner() == _msgSender(), "Ownable: caller is not the owner");
    }

    /**
     * @dev Leaves the contract without owner. It will not be possible to call
     * `onlyOwner` functions. Can only be called by the current owner.
     *
     * NOTE: Renouncing ownership will leave the contract without an owner,
     * thereby disabling any functionality that is only available to the owner.
     */
    function renounceOwnership() public virtual onlyOwner {
        _transferOwnership(address(0));
    }

    /**
     * @dev Transfers ownership of the contract to a new account (`newOwner`).
     * Can only be called by the current owner.
     */
    function transferOwnership(address newOwner) public virtual onlyOwner {
        require(newOwner != address(0), "Ownable: new owner is the zero address");
        _transferOwnership(newOwner);
    }

    /**
     * @dev Transfers ownership of the contract to a new account (`newOwner`).
     * Internal function without access restriction.
     */
    function _transferOwnership(address newOwner) internal virtual {
        address oldOwner = _owner;
        _owner = newOwner;
        emit OwnershipTransferred(oldOwner, newOwner);
    }
}


// File @openzeppelin/contracts/security/Pausable.sol@v4.9.6

// Original license: SPDX_License_Identifier: MIT
// OpenZeppelin Contracts (last updated v4.7.0) (security/Pausable.sol)

pragma solidity ^0.8.0;

/**
 * @dev Contract module which allows children to implement an emergency stop
 * mechanism that can be triggered by an authorized account.
 *
 * This module is used through inheritance. It will make available the
 * modifiers `whenNotPaused` and `whenPaused`, which can be applied to
 * the functions of your contract. Note that they will not be pausable by
 * simply including this module, only once the modifiers are put in place.
 */
abstract contract Pausable is Context {
    /**
     * @dev Emitted when the pause is triggered by `account`.
     */
    event Paused(address account);

    /**
     * @dev Emitted when the pause is lifted by `account`.
     */
    event Unpaused(address account);

    bool private _paused;

    /**
     * @dev Initializes the contract in unpaused state.
     */
    constructor() {
        _paused = false;
    }

    /**
     * @dev Modifier to make a function callable only when the contract is not paused.
     *
     * Requirements:
     *
     * - The contract must not be paused.
     */
    modifier whenNotPaused() {
        _requireNotPaused();
        _;
    }

    /**
     * @dev Modifier to make a function callable only when the contract is paused.
     *
     * Requirements:
     *
     * - The contract must be paused.
     */
    modifier whenPaused() {
        _requirePaused();
        _;
    }

    /**
     * @dev Returns true if the contract is paused, and false otherwise.
     */
    function paused() public view virtual returns (bool) {
        return _paused;
    }

    /**
     * @dev Throws if the contract is paused.
     */
    function _requireNotPaused() internal view virtual {
        require(!paused(), "Pausable: paused");
    }

    /**
     * @dev Throws if the contract is not paused.
     */
    function _requirePaused() internal view virtual {
        require(paused(), "Pausable: not paused");
    }

    /**
     * @dev Triggers stopped state.
     *
     * Requirements:
     *
     * - The contract must not be paused.
     */
    function _pause() internal virtual whenNotPaused {
        _paused = true;
        emit Paused(_msgSender());
    }

    /**
     * @dev Returns to normal state.
     *
     * Requirements:
     *
     * - The contract must be paused.
     */
    function _unpause() internal virtual whenPaused {
        _paused = false;
        emit Unpaused(_msgSender());
    }
}


// File contracts/QRNG.sol

// Original license: SPDX_License_Identifier: MIT
pragma solidity ^0.8.17;
contract QRNG is RrpRequesterV0, Ownable {
    event RandomSeedRequested(bytes32 indexed requestId, address wallet);
    event RandomSeedReceived(bytes32 indexed requestId, uint256 response);

    address public airnode; // The address of the QRNG Airnode
    bytes32 public endpointIdUint256; // The endpoint ID for requesting a single random number
    address public sponsorWallet; // The wallet that will cover the gas costs of the request

    // wallet's random seed
    mapping(address => uint256) public walletSeed;
    mapping(address => uint256) public walletLastSeedUpdate;
    mapping(bytes32 => address) public requestIdToWallet;
    uint256 public seedUpdateInterval = 1 hours;

    mapping(bytes32 => bool) public expectingRequestWithIdToBeFulfilled;

    constructor(address _airnodeRrp) RrpRequesterV0(_airnodeRrp) {}

    /// @notice Sets the parameters for making requests
    function setRequestParameters(
        address _airnode,
        bytes32 _endpointIdUint256,
        address _sponsorWallet
    ) external onlyOwner {
        airnode = _airnode;
        endpointIdUint256 = _endpointIdUint256;
        sponsorWallet = _sponsorWallet;
    }

    function setSeedUpdateInterval(
        uint256 _seedUpdateInterval
    ) external onlyOwner {
        seedUpdateInterval = _seedUpdateInterval;
    }

    function _getWalletSeedAndUpdateIfNeeded() internal returns (uint256) {
        if (
            block.timestamp - walletLastSeedUpdate[msg.sender] >
            seedUpdateInterval
        ) {
            _generateRandomSeedForWallet();
            walletLastSeedUpdate[msg.sender] = block.timestamp;
        }
        return walletSeed[msg.sender];
    }

    /// @notice Requests a `uint256`
    /// @dev This request will be fulfilled by the contract's sponsor wallet,
    /// which means spamming it may drain the sponsor wallet.
    function _generateRandomSeedForWallet() internal {
        bytes32 requestId = airnodeRrp.makeFullRequest(
            airnode,
            endpointIdUint256,
            address(this),
            sponsorWallet,
            address(this),
            this.generateRandomSeedForWalletCallback.selector,
            ""
        );
        expectingRequestWithIdToBeFulfilled[requestId] = true;
        requestIdToWallet[requestId] = msg.sender;
        emit RandomSeedRequested(requestId, msg.sender);
    }

    /// @notice Called by the Airnode through the AirnodeRrp contract to
    /// fulfill the request
    function generateRandomSeedForWalletCallback(
        bytes32 requestId,
        bytes calldata data
    ) external onlyAirnodeRrp {
        require(
            expectingRequestWithIdToBeFulfilled[requestId],
            "Request ID not known"
        );
        expectingRequestWithIdToBeFulfilled[requestId] = false;
        uint256 qrngUint256 = abi.decode(data, (uint256));
        walletSeed[requestIdToWallet[requestId]] = qrngUint256;
        emit RandomSeedReceived(requestId, qrngUint256);
    }

    /// @notice To withdraw funds from the sponsor wallet to the contract.
    function withdrawFromAirnodeSponsor() external onlyOwner {
        airnodeRrp.requestWithdrawal(airnode, sponsorWallet);
    }
}


// File @openzeppelin/contracts/utils/math/SafeMath.sol@v4.9.6

// Original license: SPDX_License_Identifier: MIT
// OpenZeppelin Contracts (last updated v4.9.0) (utils/math/SafeMath.sol)

pragma solidity ^0.8.0;

// CAUTION
// This version of SafeMath should only be used with Solidity 0.8 or later,
// because it relies on the compiler's built in overflow checks.

/**
 * @dev Wrappers over Solidity's arithmetic operations.
 *
 * NOTE: `SafeMath` is generally not needed starting with Solidity 0.8, since the compiler
 * now has built in overflow checking.
 */
library SafeMath {
    /**
     * @dev Returns the addition of two unsigned integers, with an overflow flag.
     *
     * _Available since v3.4._
     */
    function tryAdd(uint256 a, uint256 b) internal pure returns (bool, uint256) {
        unchecked {
            uint256 c = a + b;
            if (c < a) return (false, 0);
            return (true, c);
        }
    }

    /**
     * @dev Returns the subtraction of two unsigned integers, with an overflow flag.
     *
     * _Available since v3.4._
     */
    function trySub(uint256 a, uint256 b) internal pure returns (bool, uint256) {
        unchecked {
            if (b > a) return (false, 0);
            return (true, a - b);
        }
    }

    /**
     * @dev Returns the multiplication of two unsigned integers, with an overflow flag.
     *
     * _Available since v3.4._
     */
    function tryMul(uint256 a, uint256 b) internal pure returns (bool, uint256) {
        unchecked {
            // Gas optimization: this is cheaper than requiring 'a' not being zero, but the
            // benefit is lost if 'b' is also tested.
            // See: https://github.com/OpenZeppelin/openzeppelin-contracts/pull/522
            if (a == 0) return (true, 0);
            uint256 c = a * b;
            if (c / a != b) return (false, 0);
            return (true, c);
        }
    }

    /**
     * @dev Returns the division of two unsigned integers, with a division by zero flag.
     *
     * _Available since v3.4._
     */
    function tryDiv(uint256 a, uint256 b) internal pure returns (bool, uint256) {
        unchecked {
            if (b == 0) return (false, 0);
            return (true, a / b);
        }
    }

    /**
     * @dev Returns the remainder of dividing two unsigned integers, with a division by zero flag.
     *
     * _Available since v3.4._
     */
    function tryMod(uint256 a, uint256 b) internal pure returns (bool, uint256) {
        unchecked {
            if (b == 0) return (false, 0);
            return (true, a % b);
        }
    }

    /**
     * @dev Returns the addition of two unsigned integers, reverting on
     * overflow.
     *
     * Counterpart to Solidity's `+` operator.
     *
     * Requirements:
     *
     * - Addition cannot overflow.
     */
    function add(uint256 a, uint256 b) internal pure returns (uint256) {
        return a + b;
    }

    /**
     * @dev Returns the subtraction of two unsigned integers, reverting on
     * overflow (when the result is negative).
     *
     * Counterpart to Solidity's `-` operator.
     *
     * Requirements:
     *
     * - Subtraction cannot overflow.
     */
    function sub(uint256 a, uint256 b) internal pure returns (uint256) {
        return a - b;
    }

    /**
     * @dev Returns the multiplication of two unsigned integers, reverting on
     * overflow.
     *
     * Counterpart to Solidity's `*` operator.
     *
     * Requirements:
     *
     * - Multiplication cannot overflow.
     */
    function mul(uint256 a, uint256 b) internal pure returns (uint256) {
        return a * b;
    }

    /**
     * @dev Returns the integer division of two unsigned integers, reverting on
     * division by zero. The result is rounded towards zero.
     *
     * Counterpart to Solidity's `/` operator.
     *
     * Requirements:
     *
     * - The divisor cannot be zero.
     */
    function div(uint256 a, uint256 b) internal pure returns (uint256) {
        return a / b;
    }

    /**
     * @dev Returns the remainder of dividing two unsigned integers. (unsigned integer modulo),
     * reverting when dividing by zero.
     *
     * Counterpart to Solidity's `%` operator. This function uses a `revert`
     * opcode (which leaves remaining gas untouched) while Solidity uses an
     * invalid opcode to revert (consuming all remaining gas).
     *
     * Requirements:
     *
     * - The divisor cannot be zero.
     */
    function mod(uint256 a, uint256 b) internal pure returns (uint256) {
        return a % b;
    }

    /**
     * @dev Returns the subtraction of two unsigned integers, reverting with custom message on
     * overflow (when the result is negative).
     *
     * CAUTION: This function is deprecated because it requires allocating memory for the error
     * message unnecessarily. For custom revert reasons use {trySub}.
     *
     * Counterpart to Solidity's `-` operator.
     *
     * Requirements:
     *
     * - Subtraction cannot overflow.
     */
    function sub(uint256 a, uint256 b, string memory errorMessage) internal pure returns (uint256) {
        unchecked {
            require(b <= a, errorMessage);
            return a - b;
        }
    }

    /**
     * @dev Returns the integer division of two unsigned integers, reverting with custom message on
     * division by zero. The result is rounded towards zero.
     *
     * Counterpart to Solidity's `/` operator. Note: this function uses a
     * `revert` opcode (which leaves remaining gas untouched) while Solidity
     * uses an invalid opcode to revert (consuming all remaining gas).
     *
     * Requirements:
     *
     * - The divisor cannot be zero.
     */
    function div(uint256 a, uint256 b, string memory errorMessage) internal pure returns (uint256) {
        unchecked {
            require(b > 0, errorMessage);
            return a / b;
        }
    }

    /**
     * @dev Returns the remainder of dividing two unsigned integers. (unsigned integer modulo),
     * reverting with custom message when dividing by zero.
     *
     * CAUTION: This function is deprecated because it requires allocating memory for the error
     * message unnecessarily. For custom revert reasons use {tryMod}.
     *
     * Counterpart to Solidity's `%` operator. This function uses a `revert`
     * opcode (which leaves remaining gas untouched) while Solidity uses an
     * invalid opcode to revert (consuming all remaining gas).
     *
     * Requirements:
     *
     * - The divisor cannot be zero.
     */
    function mod(uint256 a, uint256 b, string memory errorMessage) internal pure returns (uint256) {
        unchecked {
            require(b > 0, errorMessage);
            return a % b;
        }
    }
}


// File contracts/helper/RaiGotchiEnum.sol

// Original license: SPDX_License_Identifier: MIT
pragma solidity ^0.8.17;

enum PetStatus {
    HAPPY,
    HUNGRY,
    STARVING,
    DYING,
    DEAD
}

enum ItemType {
    MINETOOL,
    PETCARD
}


// File contracts/interfaces/IGenePool.sol

// Original license: SPDX_License_Identifier: MIT
pragma solidity ^0.8.17;

interface IGenePool {
    struct Evolution {
        string image;
        string name;
        uint256 attackPoints;
        uint256 defensePoints;
        uint256 nextEvolutionLevel;
    }

    struct SpeciesDefaultAttrs {
        uint256 skinColor;
        uint256 hornStyle;
        uint256 wingStyle;
    }
    function nft() external view returns (address);
    function totalGeneNum() external view returns (uint256);
    function speciesCount() external view returns (uint256);
    function eyeColorGeneNum() external view returns (uint256);
    function skinColorGeneNum() external view returns (uint256);
    function hornStyleGeneNum() external view returns (uint256);
    function wingStyleGeneNum() external view returns (uint256);
    function speciesToSpawnCondition(
        uint256 _id
    ) external view returns (uint256 gte, uint256 lte);
    function isSpeciesGeneInitialized(uint256 _id) external view returns (bool);
    function reducePopulationAndAddSpeciesToGenePool(uint _id) external returns (uint256);
    function removeSpeciesFromGenePool(uint _id) external;
    function generateGene(
        address _account,
        uint _nftId,
        uint seed
    ) external view returns (uint256 species, uint256 sex);
    function speciesDefaultAttrs(
        uint256 _id
    ) external view returns (SpeciesDefaultAttrs memory);
    function currentSpeciesPopulation(
        uint256 _id
    ) external view returns (uint256);
    function speciesMaxPopulation(uint256 _id) external view returns (uint256);
    function speciesMaxEvolutionPhase(
        uint256 _id
    ) external view returns (uint256);
    function getSpeciesEvolutionPhaseInfo(
        uint256 _speciesId,
        uint256 _phase
    ) external view returns (Evolution memory);
    function newMemberJoinSpecies(uint256 _speciesId) external;
}


// File contracts/interfaces/IToken.sol

// Original license: SPDX_License_Identifier: MIT
pragma solidity ^0.8.13;

interface IToken {
    function balanceOf(
        address tokenOwner
    ) external view returns (uint256 balance);

    function totalSupply() external view returns (uint256 supply);

    function transfer(
        address to,
        uint256 tokens
    ) external returns (bool success);

    function transferFrom(
        address from,
        address to,
        uint256 tokens
    ) external returns (bool success);

    function burnFrom(address account, uint256 amount) external;
}


// File solmate/src/tokens/ERC721.sol@v6.2.0

// Original license: SPDX_License_Identifier: AGPL-3.0-only
pragma solidity >=0.8.0;

/// @notice Modern, minimalist, and gas efficient ERC-721 implementation.
/// @author Solmate (https://github.com/transmissions11/solmate/blob/main/src/tokens/ERC721.sol)
abstract contract ERC721 {
    /*//////////////////////////////////////////////////////////////
                                 EVENTS
    //////////////////////////////////////////////////////////////*/

    event Transfer(address indexed from, address indexed to, uint256 indexed id);

    event Approval(address indexed owner, address indexed spender, uint256 indexed id);

    event ApprovalForAll(address indexed owner, address indexed operator, bool approved);

    /*//////////////////////////////////////////////////////////////
                         METADATA STORAGE/LOGIC
    //////////////////////////////////////////////////////////////*/

    string public name;

    string public symbol;

    function tokenURI(uint256 id) public view virtual returns (string memory);

    /*//////////////////////////////////////////////////////////////
                      ERC721 BALANCE/OWNER STORAGE
    //////////////////////////////////////////////////////////////*/

    mapping(uint256 => address) internal _ownerOf;

    mapping(address => uint256) internal _balanceOf;

    function ownerOf(uint256 id) public view virtual returns (address owner) {
        require((owner = _ownerOf[id]) != address(0), "NOT_MINTED");
    }

    function balanceOf(address owner) public view virtual returns (uint256) {
        require(owner != address(0), "ZERO_ADDRESS");

        return _balanceOf[owner];
    }

    /*//////////////////////////////////////////////////////////////
                         ERC721 APPROVAL STORAGE
    //////////////////////////////////////////////////////////////*/

    mapping(uint256 => address) public getApproved;

    mapping(address => mapping(address => bool)) public isApprovedForAll;

    /*//////////////////////////////////////////////////////////////
                               CONSTRUCTOR
    //////////////////////////////////////////////////////////////*/

    constructor(string memory _name, string memory _symbol) {
        name = _name;
        symbol = _symbol;
    }

    /*//////////////////////////////////////////////////////////////
                              ERC721 LOGIC
    //////////////////////////////////////////////////////////////*/

    function approve(address spender, uint256 id) public virtual {
        address owner = _ownerOf[id];

        require(msg.sender == owner || isApprovedForAll[owner][msg.sender], "NOT_AUTHORIZED");

        getApproved[id] = spender;

        emit Approval(owner, spender, id);
    }

    function setApprovalForAll(address operator, bool approved) public virtual {
        isApprovedForAll[msg.sender][operator] = approved;

        emit ApprovalForAll(msg.sender, operator, approved);
    }

    function transferFrom(
        address from,
        address to,
        uint256 id
    ) public virtual {
        require(from == _ownerOf[id], "WRONG_FROM");

        require(to != address(0), "INVALID_RECIPIENT");

        require(
            msg.sender == from || isApprovedForAll[from][msg.sender] || msg.sender == getApproved[id],
            "NOT_AUTHORIZED"
        );

        // Underflow of the sender's balance is impossible because we check for
        // ownership above and the recipient's balance can't realistically overflow.
        unchecked {
            _balanceOf[from]--;

            _balanceOf[to]++;
        }

        _ownerOf[id] = to;

        delete getApproved[id];

        emit Transfer(from, to, id);
    }

    function safeTransferFrom(
        address from,
        address to,
        uint256 id
    ) public virtual {
        transferFrom(from, to, id);

        require(
            to.code.length == 0 ||
                ERC721TokenReceiver(to).onERC721Received(msg.sender, from, id, "") ==
                ERC721TokenReceiver.onERC721Received.selector,
            "UNSAFE_RECIPIENT"
        );
    }

    function safeTransferFrom(
        address from,
        address to,
        uint256 id,
        bytes calldata data
    ) public virtual {
        transferFrom(from, to, id);

        require(
            to.code.length == 0 ||
                ERC721TokenReceiver(to).onERC721Received(msg.sender, from, id, data) ==
                ERC721TokenReceiver.onERC721Received.selector,
            "UNSAFE_RECIPIENT"
        );
    }

    /*//////////////////////////////////////////////////////////////
                              ERC165 LOGIC
    //////////////////////////////////////////////////////////////*/

    function supportsInterface(bytes4 interfaceId) public view virtual returns (bool) {
        return
            interfaceId == 0x01ffc9a7 || // ERC165 Interface ID for ERC165
            interfaceId == 0x80ac58cd || // ERC165 Interface ID for ERC721
            interfaceId == 0x5b5e139f; // ERC165 Interface ID for ERC721Metadata
    }

    /*//////////////////////////////////////////////////////////////
                        INTERNAL MINT/BURN LOGIC
    //////////////////////////////////////////////////////////////*/

    function _mint(address to, uint256 id) internal virtual {
        require(to != address(0), "INVALID_RECIPIENT");

        require(_ownerOf[id] == address(0), "ALREADY_MINTED");

        // Counter overflow is incredibly unrealistic.
        unchecked {
            _balanceOf[to]++;
        }

        _ownerOf[id] = to;

        emit Transfer(address(0), to, id);
    }

    function _burn(uint256 id) internal virtual {
        address owner = _ownerOf[id];

        require(owner != address(0), "NOT_MINTED");

        // Ownership check above ensures no underflow.
        unchecked {
            _balanceOf[owner]--;
        }

        delete _ownerOf[id];

        delete getApproved[id];

        emit Transfer(owner, address(0), id);
    }

    /*//////////////////////////////////////////////////////////////
                        INTERNAL SAFE MINT LOGIC
    //////////////////////////////////////////////////////////////*/

    function _safeMint(address to, uint256 id) internal virtual {
        _mint(to, id);

        require(
            to.code.length == 0 ||
                ERC721TokenReceiver(to).onERC721Received(msg.sender, address(0), id, "") ==
                ERC721TokenReceiver.onERC721Received.selector,
            "UNSAFE_RECIPIENT"
        );
    }

    function _safeMint(
        address to,
        uint256 id,
        bytes memory data
    ) internal virtual {
        _mint(to, id);

        require(
            to.code.length == 0 ||
                ERC721TokenReceiver(to).onERC721Received(msg.sender, address(0), id, data) ==
                ERC721TokenReceiver.onERC721Received.selector,
            "UNSAFE_RECIPIENT"
        );
    }
}

/// @notice A generic interface for a contract which properly accepts ERC721 tokens.
/// @author Solmate (https://github.com/transmissions11/solmate/blob/main/src/tokens/ERC721.sol)
abstract contract ERC721TokenReceiver {
    function onERC721Received(
        address,
        address,
        uint256,
        bytes calldata
    ) external virtual returns (bytes4) {
        return ERC721TokenReceiver.onERC721Received.selector;
    }
}


// File solmate/src/utils/FixedPointMathLib.sol@v6.2.0

// Original license: SPDX_License_Identifier: AGPL-3.0-only
pragma solidity >=0.8.0;

/// @notice Arithmetic library with operations for fixed-point numbers.
/// @author Solmate (https://github.com/transmissions11/solmate/blob/main/src/utils/FixedPointMathLib.sol)
/// @author Inspired by USM (https://github.com/usmfum/USM/blob/master/contracts/WadMath.sol)
library FixedPointMathLib {
    /*//////////////////////////////////////////////////////////////
                    SIMPLIFIED FIXED POINT OPERATIONS
    //////////////////////////////////////////////////////////////*/

    uint256 internal constant MAX_UINT256 = 2**256 - 1;

    uint256 internal constant WAD = 1e18; // The scalar of ETH and most ERC20s.

    function mulWadDown(uint256 x, uint256 y) internal pure returns (uint256) {
        return mulDivDown(x, y, WAD); // Equivalent to (x * y) / WAD rounded down.
    }

    function mulWadUp(uint256 x, uint256 y) internal pure returns (uint256) {
        return mulDivUp(x, y, WAD); // Equivalent to (x * y) / WAD rounded up.
    }

    function divWadDown(uint256 x, uint256 y) internal pure returns (uint256) {
        return mulDivDown(x, WAD, y); // Equivalent to (x * WAD) / y rounded down.
    }

    function divWadUp(uint256 x, uint256 y) internal pure returns (uint256) {
        return mulDivUp(x, WAD, y); // Equivalent to (x * WAD) / y rounded up.
    }

    /*//////////////////////////////////////////////////////////////
                    LOW LEVEL FIXED POINT OPERATIONS
    //////////////////////////////////////////////////////////////*/

    function mulDivDown(
        uint256 x,
        uint256 y,
        uint256 denominator
    ) internal pure returns (uint256 z) {
        /// @solidity memory-safe-assembly
        assembly {
            // Equivalent to require(denominator != 0 && (y == 0 || x <= type(uint256).max / y))
            if iszero(mul(denominator, iszero(mul(y, gt(x, div(MAX_UINT256, y)))))) {
                revert(0, 0)
            }

            // Divide x * y by the denominator.
            z := div(mul(x, y), denominator)
        }
    }

    function mulDivUp(
        uint256 x,
        uint256 y,
        uint256 denominator
    ) internal pure returns (uint256 z) {
        /// @solidity memory-safe-assembly
        assembly {
            // Equivalent to require(denominator != 0 && (y == 0 || x <= type(uint256).max / y))
            if iszero(mul(denominator, iszero(mul(y, gt(x, div(MAX_UINT256, y)))))) {
                revert(0, 0)
            }

            // If x * y modulo the denominator is strictly greater than 0,
            // 1 is added to round up the division of x * y by the denominator.
            z := add(gt(mod(mul(x, y), denominator), 0), div(mul(x, y), denominator))
        }
    }

    function rpow(
        uint256 x,
        uint256 n,
        uint256 scalar
    ) internal pure returns (uint256 z) {
        /// @solidity memory-safe-assembly
        assembly {
            switch x
            case 0 {
                switch n
                case 0 {
                    // 0 ** 0 = 1
                    z := scalar
                }
                default {
                    // 0 ** n = 0
                    z := 0
                }
            }
            default {
                switch mod(n, 2)
                case 0 {
                    // If n is even, store scalar in z for now.
                    z := scalar
                }
                default {
                    // If n is odd, store x in z for now.
                    z := x
                }

                // Shifting right by 1 is like dividing by 2.
                let half := shr(1, scalar)

                for {
                    // Shift n right by 1 before looping to halve it.
                    n := shr(1, n)
                } n {
                    // Shift n right by 1 each iteration to halve it.
                    n := shr(1, n)
                } {
                    // Revert immediately if x ** 2 would overflow.
                    // Equivalent to iszero(eq(div(xx, x), x)) here.
                    if shr(128, x) {
                        revert(0, 0)
                    }

                    // Store x squared.
                    let xx := mul(x, x)

                    // Round to the nearest number.
                    let xxRound := add(xx, half)

                    // Revert if xx + half overflowed.
                    if lt(xxRound, xx) {
                        revert(0, 0)
                    }

                    // Set x to scaled xxRound.
                    x := div(xxRound, scalar)

                    // If n is even:
                    if mod(n, 2) {
                        // Compute z * x.
                        let zx := mul(z, x)

                        // If z * x overflowed:
                        if iszero(eq(div(zx, x), z)) {
                            // Revert if x is non-zero.
                            if iszero(iszero(x)) {
                                revert(0, 0)
                            }
                        }

                        // Round to the nearest number.
                        let zxRound := add(zx, half)

                        // Revert if zx + half overflowed.
                        if lt(zxRound, zx) {
                            revert(0, 0)
                        }

                        // Return properly scaled zxRound.
                        z := div(zxRound, scalar)
                    }
                }
            }
        }
    }

    /*//////////////////////////////////////////////////////////////
                        GENERAL NUMBER UTILITIES
    //////////////////////////////////////////////////////////////*/

    function sqrt(uint256 x) internal pure returns (uint256 z) {
        /// @solidity memory-safe-assembly
        assembly {
            let y := x // We start y at x, which will help us make our initial estimate.

            z := 181 // The "correct" value is 1, but this saves a multiplication later.

            // This segment is to get a reasonable initial estimate for the Babylonian method. With a bad
            // start, the correct # of bits increases ~linearly each iteration instead of ~quadratically.

            // We check y >= 2^(k + 8) but shift right by k bits
            // each branch to ensure that if x >= 256, then y >= 256.
            if iszero(lt(y, 0x10000000000000000000000000000000000)) {
                y := shr(128, y)
                z := shl(64, z)
            }
            if iszero(lt(y, 0x1000000000000000000)) {
                y := shr(64, y)
                z := shl(32, z)
            }
            if iszero(lt(y, 0x10000000000)) {
                y := shr(32, y)
                z := shl(16, z)
            }
            if iszero(lt(y, 0x1000000)) {
                y := shr(16, y)
                z := shl(8, z)
            }

            // Goal was to get z*z*y within a small factor of x. More iterations could
            // get y in a tighter range. Currently, we will have y in [256, 256*2^16).
            // We ensured y >= 256 so that the relative difference between y and y+1 is small.
            // That's not possible if x < 256 but we can just verify those cases exhaustively.

            // Now, z*z*y <= x < z*z*(y+1), and y <= 2^(16+8), and either y >= 256, or x < 256.
            // Correctness can be checked exhaustively for x < 256, so we assume y >= 256.
            // Then z*sqrt(y) is within sqrt(257)/sqrt(256) of sqrt(x), or about 20bps.

            // For s in the range [1/256, 256], the estimate f(s) = (181/1024) * (s+1) is in the range
            // (1/2.84 * sqrt(s), 2.84 * sqrt(s)), with largest error when s = 1 and when s = 256 or 1/256.

            // Since y is in [256, 256*2^16), let a = y/65536, so that a is in [1/256, 256). Then we can estimate
            // sqrt(y) using sqrt(65536) * 181/1024 * (a + 1) = 181/4 * (y + 65536)/65536 = 181 * (y + 65536)/2^18.

            // There is no overflow risk here since y < 2^136 after the first branch above.
            z := shr(18, mul(z, add(y, 65536))) // A mul() is saved from starting z at 181.

            // Given the worst case multiplicative error of 2.84 above, 7 iterations should be enough.
            z := shr(1, add(z, div(x, z)))
            z := shr(1, add(z, div(x, z)))
            z := shr(1, add(z, div(x, z)))
            z := shr(1, add(z, div(x, z)))
            z := shr(1, add(z, div(x, z)))
            z := shr(1, add(z, div(x, z)))
            z := shr(1, add(z, div(x, z)))

            // If x+1 is a perfect square, the Babylonian method cycles between
            // floor(sqrt(x)) and ceil(sqrt(x)). This statement ensures we return floor.
            // See: https://en.wikipedia.org/wiki/Integer_square_root#Using_only_integer_division
            // Since the ceil is rare, we save gas on the assignment and repeat division in the rare case.
            // If you don't care whether the floor or ceil square root is returned, you can remove this statement.
            z := sub(z, lt(div(x, z), z))
        }
    }

    function unsafeMod(uint256 x, uint256 y) internal pure returns (uint256 z) {
        /// @solidity memory-safe-assembly
        assembly {
            // Mod x by y. Note this will return
            // 0 instead of reverting if y is zero.
            z := mod(x, y)
        }
    }

    function unsafeDiv(uint256 x, uint256 y) internal pure returns (uint256 r) {
        /// @solidity memory-safe-assembly
        assembly {
            // Divide x by y. Note this will return
            // 0 instead of reverting if y is zero.
            r := div(x, y)
        }
    }

    function unsafeDivUp(uint256 x, uint256 y) internal pure returns (uint256 z) {
        /// @solidity memory-safe-assembly
        assembly {
            // Add 1 to x * y if x % y > 0. Note this will
            // return 0 instead of reverting if y is zero.
            z := add(gt(mod(x, y), 0), div(x, y))
        }
    }
}


// File solmate/src/tokens/ERC20.sol@v6.2.0

// Original license: SPDX_License_Identifier: AGPL-3.0-only
pragma solidity >=0.8.0;

/// @notice Modern and gas efficient ERC20 + EIP-2612 implementation.
/// @author Solmate (https://github.com/transmissions11/solmate/blob/main/src/tokens/ERC20.sol)
/// @author Modified from Uniswap (https://github.com/Uniswap/uniswap-v2-core/blob/master/contracts/UniswapV2ERC20.sol)
/// @dev Do not manually set balances without updating totalSupply, as the sum of all user balances must not exceed it.
abstract contract ERC20 {
    /*//////////////////////////////////////////////////////////////
                                 EVENTS
    //////////////////////////////////////////////////////////////*/

    event Transfer(address indexed from, address indexed to, uint256 amount);

    event Approval(address indexed owner, address indexed spender, uint256 amount);

    /*//////////////////////////////////////////////////////////////
                            METADATA STORAGE
    //////////////////////////////////////////////////////////////*/

    string public name;

    string public symbol;

    uint8 public immutable decimals;

    /*//////////////////////////////////////////////////////////////
                              ERC20 STORAGE
    //////////////////////////////////////////////////////////////*/

    uint256 public totalSupply;

    mapping(address => uint256) public balanceOf;

    mapping(address => mapping(address => uint256)) public allowance;

    /*//////////////////////////////////////////////////////////////
                            EIP-2612 STORAGE
    //////////////////////////////////////////////////////////////*/

    uint256 internal immutable INITIAL_CHAIN_ID;

    bytes32 internal immutable INITIAL_DOMAIN_SEPARATOR;

    mapping(address => uint256) public nonces;

    /*//////////////////////////////////////////////////////////////
                               CONSTRUCTOR
    //////////////////////////////////////////////////////////////*/

    constructor(
        string memory _name,
        string memory _symbol,
        uint8 _decimals
    ) {
        name = _name;
        symbol = _symbol;
        decimals = _decimals;

        INITIAL_CHAIN_ID = block.chainid;
        INITIAL_DOMAIN_SEPARATOR = computeDomainSeparator();
    }

    /*//////////////////////////////////////////////////////////////
                               ERC20 LOGIC
    //////////////////////////////////////////////////////////////*/

    function approve(address spender, uint256 amount) public virtual returns (bool) {
        allowance[msg.sender][spender] = amount;

        emit Approval(msg.sender, spender, amount);

        return true;
    }

    function transfer(address to, uint256 amount) public virtual returns (bool) {
        balanceOf[msg.sender] -= amount;

        // Cannot overflow because the sum of all user
        // balances can't exceed the max uint256 value.
        unchecked {
            balanceOf[to] += amount;
        }

        emit Transfer(msg.sender, to, amount);

        return true;
    }

    function transferFrom(
        address from,
        address to,
        uint256 amount
    ) public virtual returns (bool) {
        uint256 allowed = allowance[from][msg.sender]; // Saves gas for limited approvals.

        if (allowed != type(uint256).max) allowance[from][msg.sender] = allowed - amount;

        balanceOf[from] -= amount;

        // Cannot overflow because the sum of all user
        // balances can't exceed the max uint256 value.
        unchecked {
            balanceOf[to] += amount;
        }

        emit Transfer(from, to, amount);

        return true;
    }

    /*//////////////////////////////////////////////////////////////
                             EIP-2612 LOGIC
    //////////////////////////////////////////////////////////////*/

    function permit(
        address owner,
        address spender,
        uint256 value,
        uint256 deadline,
        uint8 v,
        bytes32 r,
        bytes32 s
    ) public virtual {
        require(deadline >= block.timestamp, "PERMIT_DEADLINE_EXPIRED");

        // Unchecked because the only math done is incrementing
        // the owner's nonce which cannot realistically overflow.
        unchecked {
            address recoveredAddress = ecrecover(
                keccak256(
                    abi.encodePacked(
                        "\x19\x01",
                        DOMAIN_SEPARATOR(),
                        keccak256(
                            abi.encode(
                                keccak256(
                                    "Permit(address owner,address spender,uint256 value,uint256 nonce,uint256 deadline)"
                                ),
                                owner,
                                spender,
                                value,
                                nonces[owner]++,
                                deadline
                            )
                        )
                    )
                ),
                v,
                r,
                s
            );

            require(recoveredAddress != address(0) && recoveredAddress == owner, "INVALID_SIGNER");

            allowance[recoveredAddress][spender] = value;
        }

        emit Approval(owner, spender, value);
    }

    function DOMAIN_SEPARATOR() public view virtual returns (bytes32) {
        return block.chainid == INITIAL_CHAIN_ID ? INITIAL_DOMAIN_SEPARATOR : computeDomainSeparator();
    }

    function computeDomainSeparator() internal view virtual returns (bytes32) {
        return
            keccak256(
                abi.encode(
                    keccak256("EIP712Domain(string name,string version,uint256 chainId,address verifyingContract)"),
                    keccak256(bytes(name)),
                    keccak256("1"),
                    block.chainid,
                    address(this)
                )
            );
    }

    /*//////////////////////////////////////////////////////////////
                        INTERNAL MINT/BURN LOGIC
    //////////////////////////////////////////////////////////////*/

    function _mint(address to, uint256 amount) internal virtual {
        totalSupply += amount;

        // Cannot overflow because the sum of all user
        // balances can't exceed the max uint256 value.
        unchecked {
            balanceOf[to] += amount;
        }

        emit Transfer(address(0), to, amount);
    }

    function _burn(address from, uint256 amount) internal virtual {
        balanceOf[from] -= amount;

        // Cannot underflow because a user's balance
        // will never be larger than the total supply.
        unchecked {
            totalSupply -= amount;
        }

        emit Transfer(from, address(0), amount);
    }
}


// File solmate/src/utils/SafeTransferLib.sol@v6.2.0

// Original license: SPDX_License_Identifier: AGPL-3.0-only
pragma solidity >=0.8.0;

/// @notice Safe ETH and ERC20 transfer library that gracefully handles missing return values.
/// @author Solmate (https://github.com/transmissions11/solmate/blob/main/src/utils/SafeTransferLib.sol)
/// @dev Use with caution! Some functions in this library knowingly create dirty bits at the destination of the free memory pointer.
/// @dev Note that none of the functions in this library check that a token has code at all! That responsibility is delegated to the caller.
library SafeTransferLib {
    /*//////////////////////////////////////////////////////////////
                             ETH OPERATIONS
    //////////////////////////////////////////////////////////////*/

    function safeTransferETH(address to, uint256 amount) internal {
        bool success;

        /// @solidity memory-safe-assembly
        assembly {
            // Transfer the ETH and store if it succeeded or not.
            success := call(gas(), to, amount, 0, 0, 0, 0)
        }

        require(success, "ETH_TRANSFER_FAILED");
    }

    /*//////////////////////////////////////////////////////////////
                            ERC20 OPERATIONS
    //////////////////////////////////////////////////////////////*/

    function safeTransferFrom(
        ERC20 token,
        address from,
        address to,
        uint256 amount
    ) internal {
        bool success;

        /// @solidity memory-safe-assembly
        assembly {
            // Get a pointer to some free memory.
            let freeMemoryPointer := mload(0x40)

            // Write the abi-encoded calldata into memory, beginning with the function selector.
            mstore(freeMemoryPointer, 0x23b872dd00000000000000000000000000000000000000000000000000000000)
            mstore(add(freeMemoryPointer, 4), and(from, 0xffffffffffffffffffffffffffffffffffffffff)) // Append and mask the "from" argument.
            mstore(add(freeMemoryPointer, 36), and(to, 0xffffffffffffffffffffffffffffffffffffffff)) // Append and mask the "to" argument.
            mstore(add(freeMemoryPointer, 68), amount) // Append the "amount" argument. Masking not required as it's a full 32 byte type.

            success := and(
                // Set success to whether the call reverted, if not we check it either
                // returned exactly 1 (can't just be non-zero data), or had no return data.
                or(and(eq(mload(0), 1), gt(returndatasize(), 31)), iszero(returndatasize())),
                // We use 100 because the length of our calldata totals up like so: 4 + 32 * 3.
                // We use 0 and 32 to copy up to 32 bytes of return data into the scratch space.
                // Counterintuitively, this call must be positioned second to the or() call in the
                // surrounding and() call or else returndatasize() will be zero during the computation.
                call(gas(), token, 0, freeMemoryPointer, 100, 0, 32)
            )
        }

        require(success, "TRANSFER_FROM_FAILED");
    }

    function safeTransfer(
        ERC20 token,
        address to,
        uint256 amount
    ) internal {
        bool success;

        /// @solidity memory-safe-assembly
        assembly {
            // Get a pointer to some free memory.
            let freeMemoryPointer := mload(0x40)

            // Write the abi-encoded calldata into memory, beginning with the function selector.
            mstore(freeMemoryPointer, 0xa9059cbb00000000000000000000000000000000000000000000000000000000)
            mstore(add(freeMemoryPointer, 4), and(to, 0xffffffffffffffffffffffffffffffffffffffff)) // Append and mask the "to" argument.
            mstore(add(freeMemoryPointer, 36), amount) // Append the "amount" argument. Masking not required as it's a full 32 byte type.

            success := and(
                // Set success to whether the call reverted, if not we check it either
                // returned exactly 1 (can't just be non-zero data), or had no return data.
                or(and(eq(mload(0), 1), gt(returndatasize(), 31)), iszero(returndatasize())),
                // We use 68 because the length of our calldata totals up like so: 4 + 32 * 2.
                // We use 0 and 32 to copy up to 32 bytes of return data into the scratch space.
                // Counterintuitively, this call must be positioned second to the or() call in the
                // surrounding and() call or else returndatasize() will be zero during the computation.
                call(gas(), token, 0, freeMemoryPointer, 68, 0, 32)
            )
        }

        require(success, "TRANSFER_FAILED");
    }

    function safeApprove(
        ERC20 token,
        address to,
        uint256 amount
    ) internal {
        bool success;

        /// @solidity memory-safe-assembly
        assembly {
            // Get a pointer to some free memory.
            let freeMemoryPointer := mload(0x40)

            // Write the abi-encoded calldata into memory, beginning with the function selector.
            mstore(freeMemoryPointer, 0x095ea7b300000000000000000000000000000000000000000000000000000000)
            mstore(add(freeMemoryPointer, 4), and(to, 0xffffffffffffffffffffffffffffffffffffffff)) // Append and mask the "to" argument.
            mstore(add(freeMemoryPointer, 36), amount) // Append the "amount" argument. Masking not required as it's a full 32 byte type.

            success := and(
                // Set success to whether the call reverted, if not we check it either
                // returned exactly 1 (can't just be non-zero data), or had no return data.
                or(and(eq(mload(0), 1), gt(returndatasize(), 31)), iszero(returndatasize())),
                // We use 68 because the length of our calldata totals up like so: 4 + 32 * 2.
                // We use 0 and 32 to copy up to 32 bytes of return data into the scratch space.
                // Counterintuitively, this call must be positioned second to the or() call in the
                // surrounding and() call or else returndatasize() will be zero during the computation.
                call(gas(), token, 0, freeMemoryPointer, 68, 0, 32)
            )
        }

        require(success, "APPROVE_FAILED");
    }
}


// File contracts/RaiGotchiV2.sol

// Original license: SPDX_License_Identifier: UNLICENSED

pragma solidity ^0.8.17;
// ERC721,
contract RaiGotchiV2 is QRNG, ERC721, Pausable {
    using SafeTransferLib for address payable;
    using FixedPointMathLib for uint256;
    using SafeMath for uint256;

    uint public mintPrice = 1 ether;

    uint256 PRECISION = 1 ether;

    IToken public token;
    IGenePool public genePool;

    address public breedContract;
    address public stakingAndMiningContract;
    address public attackContract;
    address public immidiateUseItemsContract;
    address public treasury;

    uint256 public la = 2;
    uint256 public lb = 2;

    // Count pet id
    uint256 public _tokenIds;

    // pet properties
    mapping(uint256 => string) public petName;
    mapping(uint256 => uint256) public timeUntilStarving;
    mapping(uint256 => uint256) public petScore;
    mapping(uint256 => uint256) public timePetBorn;
    mapping(uint256 => uint256) public petSpecies;
    mapping(uint256 => uint256) public petSex;
    mapping(uint256 => uint256) public petSkinColor;
    mapping(uint256 => uint256) public petHornStyle;
    mapping(uint256 => uint256) public petWingStyle;
    mapping(uint256 => uint256) public petEvolutionPhase;
    mapping(uint256 => bool) public petHasParents;
    mapping(uint256 => uint256[2]) public petParentsId;
    mapping(uint256 => uint256) public petShield;
    mapping(uint256 => bool) public isPetLocked;
    mapping(uint256 => uint256) private _petPendingStarvingTime;
    mapping(uint256 => PetStatus) private _lockedPetStatus;
    mapping(uint256 => uint256) public petAccessories;

    // vritual staking
    mapping(uint256 => uint256) public ethOwed;
    mapping(uint256 => uint256) public petRewardDebt;

    uint256 public ethAccPerShare;

    uint256 public totalScores = 0;

    uint256 public hasTheDiamond;

    /*//////////////////////////////////////////////////////////////
                             Events
    //////////////////////////////////////////////////////////////*/
    event PetKilled(
        uint256 deadId,
        string loserName,
        uint256 reward,
        address killer
    );

    event RedeemRewards(uint256 indexed petId, uint256 reward);

    event Pass(uint256 from, uint256 to);

    event NewPetBreeded(
        uint256 petSpecies,
        uint256 petSkinColor,
        uint256 petHornStyle,
        uint256 petWingStyle,
        uint256 petSex,
        bool petHasParents,
        uint256[2] petParentsId,
        uint256 timeUntilStarving,
        uint256 timePetBorn
    );

    constructor(
        address _token,
        address _qrngAirnode,
        address _treasury
    ) QRNG(_qrngAirnode) ERC721("Rai Gotchi Pet", "Rai Gotchi") {
        token = IToken(_token);
        treasury = _treasury;
    }

    modifier isApproved(uint256 id) {
        require(
            ownerOf(id) == msg.sender || getApproved[id] == msg.sender,
            "Not approved"
        );

        _;
    }

    modifier isAuthorized() {
        require(
            msg.sender == breedContract ||
                msg.sender == stakingAndMiningContract ||
                msg.sender == attackContract ||
                msg.sender == immidiateUseItemsContract,
            "Not authorized"
        );
        _;
    }

    /*//////////////////////////////////////////////////////////////
                        Game Actions
    //////////////////////////////////////////////////////////////*/

    function mint() public whenNotPaused {
        // require(_tokenIds < 20_000, "Over the limit");

        token.transferFrom(msg.sender, treasury, mintPrice);

        timeUntilStarving[_tokenIds] = block.timestamp + 1 days;
        timePetBorn[_tokenIds] = block.timestamp;

        (uint256 newPetSpecies, uint256 newPetSex) = genePool.generateGene(
            msg.sender,
            _tokenIds,
            _getWalletSeedAndUpdateIfNeeded()
        );

        IGenePool.SpeciesDefaultAttrs memory speciesDefaultAttrs = genePool
            .speciesDefaultAttrs(newPetSpecies);

        genePool.newMemberJoinSpecies(newPetSpecies);
        petSpecies[_tokenIds] = newPetSpecies;
        petSkinColor[_tokenIds] = speciesDefaultAttrs.skinColor;
        petHornStyle[_tokenIds] = speciesDefaultAttrs.hornStyle;
        petWingStyle[_tokenIds] = speciesDefaultAttrs.wingStyle;
        petSex[_tokenIds] = newPetSex;

        if (
            genePool.currentSpeciesPopulation(newPetSpecies) ==
            genePool.speciesMaxPopulation(newPetSpecies)
        ) {
            genePool.removeSpeciesFromGenePool(newPetSpecies);
        }

        // mint NFT
        _mint(msg.sender, _tokenIds);
        _tokenIds++;
    }

    // kill and burn pets.
    function kill(uint256 _deadId) external whenNotPaused {
        require(
            !isPetAlive(_deadId),
            "The pet has to be starved to claim his points"
        );

        require(
            ownerOf(_deadId) == msg.sender,
            "You are not the owner of this pet"
        );

        require(
            hasTheDiamond != _deadId,
            "Pet has diamond, please pass it before kill"
        );

        uint256 speciesOfDead = petSpecies[_deadId];
        address ownerOfDead = ownerOf(_deadId);

        if (
            genePool.currentSpeciesPopulation(speciesOfDead) ==
            genePool.speciesMaxPopulation(speciesOfDead)
        ) {
            genePool.reducePopulationAndAddSpeciesToGenePool(speciesOfDead);
        }

        _burn(_deadId);
        uint256 pending = pendingEth(_deadId);
        // redeem for dead pet
        _redeem(_deadId, ownerOfDead);

        totalScores -= petScore[_deadId];
        petScore[_deadId] = 0;

        _getWalletSeedAndUpdateIfNeeded();

        emit PetKilled(_deadId, petName[_deadId], pending, msg.sender);
    }

    function setPetName(
        uint256 _id,
        string memory _name
    ) external isApproved(_id) whenNotPaused {
        petName[_id] = _name;
    }

    function checkPetEvoleAndUpdateIfNeeded(
        uint256 _nftId
    ) external isAuthorized whenNotPaused {
        _evolvePetIfNeeded(_nftId);
    }

    function createNewPetAfterBreed(
        uint256 _random,
        uint256 _newPetSpecies,
        uint256 _parent1Id,
        uint256 _parent2Id
    ) external whenNotPaused {
        require(
            msg.sender == breedContract,
            "Only breed contract can create new pet"
        );
        uint256 _newPetSkinColor = (_random + 2) % genePool.skinColorGeneNum();
        uint256 _newPetHornStyle = (_random + 3) % genePool.hornStyleGeneNum();
        uint256 _newPetWingStyle = (_random + 4) % genePool.wingStyleGeneNum();
        uint256 _newPetSex = (_random + 5) % 2;

        genePool.newMemberJoinSpecies(_newPetSpecies);
        petSpecies[_tokenIds] = _newPetSpecies;
        petSkinColor[_tokenIds] = _newPetSkinColor;
        petHornStyle[_tokenIds] = _newPetHornStyle;
        petWingStyle[_tokenIds] = _newPetWingStyle;
        petSex[_tokenIds] = _newPetSex;
        petHasParents[_tokenIds];
        petParentsId[_tokenIds] = [_parent1Id, _parent2Id];
        timeUntilStarving[_tokenIds] = block.timestamp + 1 days;
        timePetBorn[_tokenIds] = block.timestamp;

        if (
            genePool.currentSpeciesPopulation(_newPetSpecies) ==
            genePool.speciesMaxPopulation(_newPetSpecies)
        ) {
            genePool.removeSpeciesFromGenePool(_newPetSpecies);
        }

        // mint NFT
        _mint(msg.sender, _tokenIds);
        _tokenIds++;
    }

    function reducePetShield(uint256 _nftId) external whenNotPaused {
        require(msg.sender == attackContract, "Not authorized");
        petShield[_nftId] -= 1;
    }

    function setPetInfoAfterAttack(
        uint256 winnerId,
        uint256 loserId,
        uint256 _score,
        uint256 _debt
    ) external whenNotPaused {
        require(msg.sender == attackContract, "Not authorized");

        petScore[loserId] -= _score;
        petRewardDebt[loserId] -= _debt;

        petScore[winnerId] += _score;
        petRewardDebt[winnerId] += _debt;
    }

    function lockPet(uint256 _nftId) external isAuthorized whenNotPaused {
        require(isPetAlive(_nftId), "Can't lock dead pet");
        isPetLocked[_nftId] = true;
        _petPendingStarvingTime[_nftId] =
            block.timestamp -
            timeUntilStarving[_nftId];
        _lockedPetStatus[_nftId] = getStatus(_nftId);
    }

    function unlockPet(uint256 _nftId) external isAuthorized whenNotPaused {
        isPetLocked[_nftId] = false;
        timeUntilStarving[_nftId] =
            block.timestamp +
            _petPendingStarvingTime[_nftId];
        _petPendingStarvingTime[_nftId] = 0;
        _lockedPetStatus[_nftId] = PetStatus.DEAD;
    }

    function _evolvePetIfNeeded(uint256 _nftId) internal {
        uint256 currentEvolutionPhase = petEvolutionPhase[_nftId];

        uint256 nextEvolutionPhase = getPetEvolutionPhase(_nftId);

        if (currentEvolutionPhase < nextEvolutionPhase) {
            petEvolutionPhase[_nftId] = nextEvolutionPhase;
        }
    }

    // just side quest for later to add to ui, one thing in the game that can be passed to other players
    function pass(
        uint256 from,
        uint256 to
    ) external isApproved(from) whenNotPaused {
        require(hasTheDiamond == from, "you don't have it");
        require(ownerOf(to) != address(0x0), "don't burn it");

        hasTheDiamond = to;

        emit Pass(from, to);
    }

    function onConsumeImmidiateUseItem(
        uint256 _nftId,
        uint256 _itemTimeExtension,
        uint256 _itemShield,
        uint256 _itemPoints,
        bool _itemIsAccessory
    ) external whenNotPaused {
        require(msg.sender == immidiateUseItemsContract, "Not authorized");

        // recalculate time until starving
        if (isPetLocked[_nftId]) {
            _petPendingStarvingTime[_nftId] += _itemTimeExtension;
        } else {
            timeUntilStarving[_nftId] += _itemTimeExtension;
        }

        petShield[_nftId] += _itemShield;

        if (_itemIsAccessory) {
            petAccessories[_nftId]++;
        }

        if (petScore[_nftId] > 0) {
            ethOwed[_nftId] = pendingEth(_nftId);
        }

        petScore[_nftId] += _itemPoints;
        petRewardDebt[_nftId] = petScore[_nftId].mulDivDown(
            ethAccPerShare,
            PRECISION
        );
        totalScores += _itemPoints;

        _evolvePetIfNeeded(_nftId);
    }

    /*//////////////////////////////////////////////////////////////
                        Game Getters
    //////////////////////////////////////////////////////////////*/
    function getPetEvolutionPhase(
        uint256 _nftId
    ) public view returns (uint256) {
        uint256 _species = petSpecies[_nftId];
        uint256 _evolutionPhase = petEvolutionPhase[_nftId];
        uint256 speciesMaxEvolutionPhase = genePool.speciesMaxEvolutionPhase(
            _species
        );
        if (_evolutionPhase < speciesMaxEvolutionPhase) {
            return _getPetEvolutionPhase(_nftId, _evolutionPhase);
        } else {
            return speciesMaxEvolutionPhase;
        }
    }

    function getStatus(uint256 pet) public view returns (PetStatus _health) {
        if (isPetLocked[pet]) {
            return _lockedPetStatus[pet];
        }

        if (!isPetAlive(pet)) {
            return PetStatus.DEAD;
        }

        if (timeUntilStarving[pet] > block.timestamp + 16 hours)
            return PetStatus.HAPPY;
        if (
            timeUntilStarving[pet] > block.timestamp + 12 hours &&
            timeUntilStarving[pet] < block.timestamp + 16 hours
        ) return PetStatus.HUNGRY;

        if (
            timeUntilStarving[pet] > block.timestamp + 8 hours &&
            timeUntilStarving[pet] < block.timestamp + 12 hours
        ) return PetStatus.STARVING;

        if (timeUntilStarving[pet] < block.timestamp + 8 hours)
            return PetStatus.DYING;
    }

    // check that Pet didn't starve
    function isPetAlive(uint256 _nftId) public view returns (bool) {
        uint256 _timeUntilStarving = timeUntilStarving[_nftId];
        if (_timeUntilStarving != 0 && _timeUntilStarving >= block.timestamp) {
            return true;
        } else {
            return false;
        }
    }

    function getPetGenes(
        uint256 _nftId
    ) public view returns (string memory genes) {
        genes = string(
            abi.encodePacked(
                _uint2str(petSpecies[_nftId]),
                _uint2str(petSkinColor[_nftId]),
                _uint2str(petHornStyle[_nftId]),
                _uint2str(petWingStyle[_nftId]),
                _uint2str(petSex[_nftId])
            )
        );
    }

    function getPetInfo(
        uint256 _nftId
    )
        public
        view
        returns (
            string memory _name,
            PetStatus _status,
            uint256 _score,
            uint256 _level,
            uint256 _timeUntilStarving,
            address _owner,
            uint256 _rewards,
            string memory _genes
        )
    {
        _name = petName[_nftId];
        _status = getStatus(_nftId);
        _score = petScore[_nftId];
        _level = level(_nftId);
        _timeUntilStarving = timeUntilStarving[_nftId];
        _owner = !isPetAlive(_nftId) && _score == 0
            ? address(0x0)
            : ownerOf(_nftId);
        _rewards = pendingEth(_nftId);
        _genes = getPetGenes(_nftId);
    }

    function getPetEvolutionInfo(
        uint256 _nftId
    )
        external
        view
        returns (
            uint256 _species,
            uint256 _evolutionPhase,
            uint256 _maxEvolutionPhase,
            string memory _image,
            string memory _speciesName,
            uint256 _attackPoints,
            uint256 _defensePoints
        )
    {
        _species = petSpecies[_nftId];
        _evolutionPhase = petEvolutionPhase[_nftId];

        IGenePool.Evolution memory speciesToEvolutions = genePool
            .getSpeciesEvolutionPhaseInfo(_species, _evolutionPhase);

        _maxEvolutionPhase = genePool.speciesMaxEvolutionPhase(_species);
        _image = speciesToEvolutions.image;
        _speciesName = speciesToEvolutions.name;
        _attackPoints = speciesToEvolutions.attackPoints;
        _defensePoints = speciesToEvolutions.defensePoints;
    }

    function getPetAttributes(
        uint256 _nftId
    )
        public
        view
        returns (
            uint256 _species,
            uint256 _skinColor,
            uint256 _hornStyle,
            uint256 _wingStyle,
            uint256 _sex,
            uint256[2] memory _parentsId
        )
    {
        _species = petSpecies[_nftId];
        _skinColor = petSkinColor[_nftId];
        _hornStyle = petHornStyle[_nftId];
        _wingStyle = petWingStyle[_nftId];
        _sex = petSex[_nftId];
        _parentsId = petParentsId[_nftId];
    }

    function getPetAttackPoints(
        uint256 _nftId
    ) public view returns (uint256 _attackPoints) {
        uint256 _species = petSpecies[_nftId];
        uint256 _evolutionPhase = petEvolutionPhase[_nftId];
        _attackPoints = genePool
            .getSpeciesEvolutionPhaseInfo(_species, _evolutionPhase)
            .attackPoints;
    }

    function getPetDefensePoints(
        uint256 _nftId
    ) public view returns (uint256 _defensePoints) {
        uint256 _species = petSpecies[_nftId];
        uint256 _evolutionPhase = petEvolutionPhase[_nftId];
        _defensePoints = genePool
            .getSpeciesEvolutionPhaseInfo(_species, _evolutionPhase)
            .defensePoints;
    }

    function getPetImage(
        uint256 _nftId
    ) public view returns (string memory _image) {
        uint256 _species = petSpecies[_nftId];
        uint256 _evolutionPhase = petEvolutionPhase[_nftId];
        _image = genePool
            .getSpeciesEvolutionPhaseInfo(_species, _evolutionPhase)
            .image;
    }

    /*//////////////////////////////////////////////////////////////
                        Metadata
    //////////////////////////////////////////////////////////////*/

    function tokenURI(uint256 id) public view override returns (string memory) {
        // uint256 a = id;
        string memory image = getPetImage(id);
        string memory attributes = string(
            abi.encodePacked('", "attributes":[', _generateMetadata(id), "]}")
        );
        return
            string(
                abi.encodePacked(
                    "data:application/json;utf8,",
                    (
                        (
                            abi.encodePacked(
                                '{"name":"Rai Gotchi Pet #',
                                _uint2str(id),
                                '","image": ',
                                '"',
                                image,
                                attributes
                            )
                        )
                    )
                )
            );
    }

    function _generateMetadata(
        uint256 id
    ) internal view returns (string memory) {
        uint256 _score = petScore[id];
        uint256 _level = level(id);
        PetStatus status = getStatus(id);

        string memory metadata = string(
            abi.encodePacked(
                '{"trait_type": "Score","value":"',
                _uint2str(_score),
                '"},{"trait_type": "Level","value":"',
                _uint2str(_level),
                '"},{"trait_type": "Status","value":"',
                _uint2str(uint256(status)),
                '"}'
            )
        );
        return metadata;
    }

    // calculate level based on points
    function level(uint256 tokenId) public view returns (uint256) {
        // This is the formula L(x) = 2 * sqrt(x * 2)

        uint256 _score = petScore[tokenId] / 1e12;
        _score = _score / 100;
        if (_score == 0) {
            return 1;
        }
        uint256 _level = _sqrtu(_score * la);
        return (_level * lb);
    }

    /*//////////////////////////////////////////////////////////////
                         Virtual Staking Logic
    //////////////////////////////////////////////////////////////*/

    function pendingEth(uint256 petId) public view returns (uint256) {
        uint256 _ethAccPerShare = ethAccPerShare;

        //petRewardDebt can sometimes be bigger by 1 wei do to several mulDivDowns so we do extra checks
        if (
            petScore[petId].mulDivDown(_ethAccPerShare, PRECISION) <
            petRewardDebt[petId]
        ) {
            return ethOwed[petId];
        } else {
            return
                (petScore[petId].mulDivDown(_ethAccPerShare, PRECISION))
                    .sub(petRewardDebt[petId])
                    .add(ethOwed[petId]);
        }
    }

    function _redeem(uint256 petId, address _to) internal {
        uint256 pending = pendingEth(petId);

        ethOwed[petId] = 0;
        petRewardDebt[petId] = petScore[petId].mulDivDown(
            ethAccPerShare,
            PRECISION
        );

        payable(_to).safeTransferETH(pending);

        emit RedeemRewards(petId, pending);
    }

    function redeem(uint256 petId) public isApproved(petId) {
        _redeem(petId, ownerOf(petId));
    }

    /*//////////////////////////////////////////////////////////////
                        Admin Functions
    //////////////////////////////////////////////////////////////*/
    function setBreedContract(address _breedContract) external onlyOwner {
        breedContract = _breedContract;
    }

    function setStakingAndMiningContract(
        address _stakingAndMiningContract
    ) external onlyOwner {
        stakingAndMiningContract = _stakingAndMiningContract;
    }

    function setAttackContract(address _attackContract) external onlyOwner {
        attackContract = _attackContract;
    }

    function setTreasuryAddress(address _treasury) external onlyOwner {
        treasury = _treasury;
    }

    function setGenePool(address _genePool) external onlyOwner {
        genePool = IGenePool(_genePool);
    }

    function setImmidiateUseItemsContract(
        address _immidiateUseItemsContract
    ) external onlyOwner {
        immidiateUseItemsContract = _immidiateUseItemsContract;
    }

    function setMintPrice(uint256 _price) external onlyOwner {
        mintPrice = _price;
    }

    /**
     * @dev Pauses the contract.
     * Only the contract owner can call this function.
     */
    function pause() external onlyOwner {
        super._pause();
    }

    /**
     * @dev Unpauses the contract.
     * Only the contract owner can call this function.
     */
    function unpause() external onlyOwner {
        super._unpause();
    }

    /**
     * Calculate the next evolution phase of a pet. If the pet is ready to evolve, the function will call itself recursively until the pet is not ready to evolve.
     * @param _nftId The NFT ID of the pet.
     * @param currentEvoPhase The current evolution phase of the pet.
     */
    function _getPetEvolutionPhase(
        uint256 _nftId,
        uint256 currentEvoPhase
    ) private view returns (uint256) {
        uint256 _species = petSpecies[_nftId];
        uint256 _speciesMaxEvolutionPhase = genePool.speciesMaxEvolutionPhase(
            _species
        );
        if (currentEvoPhase == _speciesMaxEvolutionPhase) {
            return _speciesMaxEvolutionPhase;
        }
        uint256 evoLevel = genePool
            .getSpeciesEvolutionPhaseInfo(_species, currentEvoPhase)
            .nextEvolutionLevel;
        if (level(_nftId) >= evoLevel) {
            return _getPetEvolutionPhase(_nftId, currentEvoPhase + 1);
        }
        return currentEvoPhase;
    }

    /**
     * Calculate sqrt (x) rounding down, where x is unsigned 256-bit integer
     * number.
     *
     * @param x unsigned 256-bit integer number
     * @return unsigned 128-bit integer number
     */
    function _sqrtu(uint256 x) private pure returns (uint128) {
        if (x == 0) return 0;
        else {
            uint256 xx = x;
            uint256 r = 1;
            if (xx >= 0x100000000000000000000000000000000) {
                xx >>= 128;
                r <<= 64;
            }
            if (xx >= 0x10000000000000000) {
                xx >>= 64;
                r <<= 32;
            }
            if (xx >= 0x100000000) {
                xx >>= 32;
                r <<= 16;
            }
            if (xx >= 0x10000) {
                xx >>= 16;
                r <<= 8;
            }
            if (xx >= 0x100) {
                xx >>= 8;
                r <<= 4;
            }
            if (xx >= 0x10) {
                xx >>= 4;
                r <<= 2;
            }
            if (xx >= 0x8) {
                r <<= 1;
            }
            r = (r + x / r) >> 1;
            r = (r + x / r) >> 1;
            r = (r + x / r) >> 1;
            r = (r + x / r) >> 1;
            r = (r + x / r) >> 1;
            r = (r + x / r) >> 1;
            r = (r + x / r) >> 1; // Seven iterations should be enough
            uint256 r1 = x / r;
            return uint128(r < r1 ? r : r1);
        }
    }

    function getWalletSeedAndUpdateIfNeeded()
        external
        isAuthorized
        returns (uint256)
    {
        return _getWalletSeedAndUpdateIfNeeded();
    }

    function random(uint256 seed) private returns (uint) {
        return
            uint(
                keccak256(
                    abi.encodePacked(
                        seed,
                        block.prevrandao,
                        block.timestamp,
                        msg.sender,
                        _getWalletSeedAndUpdateIfNeeded()
                    )
                )
            );
    }

    function _uint2str(
        uint256 _i
    ) internal pure returns (string memory _uintAsString) {
        if (_i == 0) {
            return "0";
        }
        uint256 j = _i;
        uint256 len;
        while (j != 0) {
            len++;
            j /= 10;
        }
        bytes memory bstr = new bytes(len);
        uint256 k = len;
        while (_i != 0) {
            k = k - 1;
            uint8 temp = (48 + uint8(_i - (_i / 10) * 10));
            bytes1 b1 = bytes1(temp);
            bstr[k] = b1;
            _i /= 10;
        }
        return string(bstr);
    }

    receive() external payable {
        ethAccPerShare += msg.value.mulDivDown(PRECISION, totalScores);
    }

    function transferFrom(
        address from,
        address to,
        uint256 tokenId
    ) public override whenNotPaused {
        require(!isPetLocked[tokenId], "Can't transfer locked pet");
        super.transferFrom(from, to, tokenId);
    }
}
