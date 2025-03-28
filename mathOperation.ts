/**
 * Import type for the calculator to improve type safety
 */
import { ScientificCalculator } from './utility';

import {
  ERROR_MESSAGE,
  REGEX_NUMBER_END,
  REGEX_NUMBER_DECIMAL_END,
  REGEX_POWER_2_OR_3,
  REGEX_SUPERSCRIPT_2_OR_3,
  REGEX_OPERATOR_END,
  REGEX_OPERATOR_OR_OPEN_PAREN,
  SQUARE_POWER,
  CUBE_POWER,
  SUPERSCRIPT_2,
  SUPERSCRIPT_3,
  POWER_10,
  DISPLAY_POWER_10,
  POWER_OPERATOR,
  DISPLAY_POWER,
  MATH_PI,
  DISPLAY_PI,
  MATH_E,
  DISPLAY_E,
  SINE_DEG,
  SINE,
  DISPLAY_SINE,
  COSINE_DEG,
  COSINE,
  DISPLAY_COSINE,
  TANGENT_DEG,
  TANGENT,
  DISPLAY_TANGENT,
  FLOOR,
  DISPLAY_FLOOR,
  CEIL,
  DISPLAY_CEIL,
  LOG10,
  DISPLAY_LOG,
  LN,
  DISPLAY_LN,
  ABS,
  DISPLAY_ABS,
  CUBE_ROOT,
  DISPLAY_CUBE_ROOT,
  SQUARE_ROOT,
  DISPLAY_SQUARE_ROOT,
  EMPTY_STRING
} from './constant';

/**
 * @class MathOperations
 * @description Handles mathematical operations
 */
class MathOperations {
  /**
   * Reference to the main calculator instance
   */
  private calci: ScientificCalculator;

  /**
   * Flag to track exponential notation mode
   */
  private exp: boolean;

  /**
   * @constructor
   * @param {ScientificCalculator} calci - Calculator instance
   */
  constructor(calci: ScientificCalculator) {
    this.calci = calci;
    this.exp = false;
    
    // Bind methods to preserve 'this' context
    this.square = this.square.bind(this);
    this.tenx = this.tenx.bind(this);
    this.xy = this.xy.bind(this);
    this.pi = this.pi.bind(this);
    this.exponent = this.exponent.bind(this);
    this.factorial = this.factorial.bind(this);
    this.factorialHandler = this.factorialHandler.bind(this);
    this.signChange = this.signChange.bind(this);
    this.inverse = this.inverse.bind(this);
    this.expi = this.expi.bind(this);
  }

  /**
   * @method square
   * @description Applies square or cube operation on second button mode
   * @returns {void}
   */
  public square(): void {
    this.calci.evalstr = this.calci.evalstr.replace(REGEX_POWER_2_OR_3, EMPTY_STRING);
    this.calci.resultstr = this.calci.resultstr.replace(REGEX_SUPERSCRIPT_2_OR_3, EMPTY_STRING);
    
    if (this.calci.evalstr === EMPTY_STRING || REGEX_OPERATOR_END.test(this.calci.evalstr)) return;
    
    if (this.calci.modeManager.isSecondMode()) {
      this.calci.evalstr += CUBE_POWER;
      this.calci.resultstr += SUPERSCRIPT_3;
    } else {
      this.calci.evalstr += SQUARE_POWER;
      this.calci.resultstr += SUPERSCRIPT_2;
    }
    
    this.calci.renderDisplay();
  }

  /**
   * @method tenx
   * @description Applies 10 to the power of x 
   * @returns {void}
   */
  public tenx(): void {
    if (
      this.calci.evalstr === EMPTY_STRING ||
      REGEX_OPERATOR_OR_OPEN_PAREN.test(this.calci.evalstr)
    ) {
      this.calci.evalstr += POWER_10;
      this.calci.resultstr += DISPLAY_POWER_10;
    } else {
      this.calci.evalstr += "*" + POWER_10;
      this.calci.resultstr += "*" + DISPLAY_POWER_10;
    }
    
    this.calci.renderDisplay();
  }

  /**
   * @method xy
   * @description Applies x to the power of y 
   * @returns {void}
   */
  public xy(): void {
    if (!this.calci.evalstr.endsWith(POWER_OPERATOR)) {
      this.calci.evalstr += POWER_OPERATOR;
      this.calci.resultstr += DISPLAY_POWER;
      this.calci.renderDisplay();
    }
  }

  /**
   * @method pi
   * @description Adds π to the expression
   * @returns {void}
   */
  public pi(): void {
    if (
      this.calci.evalstr &&
      !isNaN(Number(this.calci.evalstr[this.calci.evalstr.length - 1]))
    ) {
      this.calci.evalstr += "*" + MATH_PI;
      this.calci.resultstr += "*" + DISPLAY_PI;
    } else {
      this.calci.evalstr += MATH_PI;
      this.calci.resultstr += DISPLAY_PI;
    }
    
    this.calci.renderDisplay();
  }

  /**
   * @method exponent
   * @description Adds e to the expression
   * @returns {void}
   */
  public exponent(): void {
    if (
      this.calci.evalstr &&
      !isNaN(Number(this.calci.evalstr[this.calci.evalstr.length - 1]))
    ) {
      this.calci.evalstr += "*" + MATH_E;
      this.calci.resultstr += "*" + DISPLAY_E;
    } else {
      this.calci.evalstr += MATH_E;
      this.calci.resultstr += DISPLAY_E;
    }
    
    this.calci.renderDisplay();
  }

  /**
   * @method factorial
   * @description Calculates the factorial of a number
   * @param {number} n - The number to calculate factorial for
   * @returns {number|string} The factorial result or error message
   */
  public factorial(n: number): number | string {
    try {
      if (n === 0 || n === 1) {
        return 1;
      }
      
      let result = 1;
      for (let i = 2; i <= n; i++) {
        result *= i;
      }
      
      return result;
    } catch (error) {
      return ERROR_MESSAGE;
    }
  }

  /**
   * @method factorialHandler
   * @description Handles factorial operation 
   * @returns {void}
   */
  public factorialHandler(): void {
    try {
      if (
        this.calci.evalstr === EMPTY_STRING ||
        isNaN(Number(this.calci.evalstr[this.calci.evalstr.length - 1]))
      ) {
        return;
      }
      
      let num = EMPTY_STRING;
      let i = this.calci.evalstr.length - 1;
      
      while (i >= 0 && !isNaN(Number(this.calci.evalstr[i]))) {
        num = this.calci.evalstr[i] + num;
        i--;
      }
      
      if (num !== EMPTY_STRING) {
        const factValue = this.factorial(Number(num));
        this.calci.evalstr = this.calci.evalstr.slice(0, i + 1) + factValue;
        this.calci.resultstr += "!";
      }
    } catch (error) {
      this.calci.evalstr = ERROR_MESSAGE;
      this.calci.resultstr = ERROR_MESSAGE;
    } finally {
      this.calci.renderDisplay();
    }
  }

  /**
   * @method signChange
   * @description Toggles the sign of the current number
   * @returns {void}
   */
  public signChange(): void {
    if (this.calci.evalstr === EMPTY_STRING) this.calci.evalstr = "0";
    
    if (typeof this.calci.evalstr !== "string")
      this.calci.evalstr = (this.calci.evalstr as unknown as string).toString();
    
    const match = this.calci.evalstr.match(REGEX_NUMBER_END);
    
    if (match) {
      const num = Number(match[1]);
      const toggled = num * -1;
      this.calci.evalstr = this.calci.evalstr.replace(
        REGEX_NUMBER_END,
        `${toggled}`
      );
      this.calci.resultstr = this.calci.evalstr;
    }
    
    this.calci.renderDisplay();
  }

  /**
   * @method inverse
   * @description Calculates the reciprocal (1/x) 
   * @returns {void}
   */
  public inverse(): void {
    if (typeof this.calci.evalstr !== "string")
      this.calci.evalstr = (this.calci.evalstr as unknown as string).toString();
    
    const match = this.calci.evalstr.match(REGEX_NUMBER_DECIMAL_END);
    
    if (match) {
      const num = Number(match[1]);
      const inverse = `1/(${num})`;
      this.calci.evalstr = this.calci.evalstr.replace(
        REGEX_NUMBER_DECIMAL_END,
        inverse
      );
      this.calci.resultstr = this.calci.evalstr;
    }
    
    this.calci.renderDisplay();
  }

  /**
   * @method expi
   * @description Toggles between standard and scientific notation 
   * @returns {void}
   */
  public expi(): void {
    if (!this.calci.evalstr || isNaN(Number(this.calci.evalstr))) return;
    
    const num = Number(this.calci.evalstr);
    this.exp = !this.exp;
    
    if (this.exp) {
      const exponentStr = num.toExponential(2);
      const [mantissa, exponent] = exponentStr.split("e");
      this.calci.evalstr = num.toString();
      this.calci.resultstr = `${mantissa}×10^${Number(exponent)}`;
    } else {
      this.calci.evalstr = num.toString();
      this.calci.resultstr = this.calci.evalstr;
    }
    
    this.calci.renderDisplay();
  }
  
  /**
   * @method sin
   * @description Applies sine function 
   * @returns {void}
   */
  public sin(): void {
    this.calci.evalstr += this.calci.modeManager.isDegreeMode() ? SINE_DEG : SINE;
    this.calci.resultstr += DISPLAY_SINE;
    this.calci.renderDisplay();
  }
  
  /**
   * @method cos
   * @description Applies cosine
   * @returns {void}
   */
  public cos(): void {
    this.calci.evalstr += this.calci.modeManager.isDegreeMode() ? COSINE_DEG : COSINE;
    this.calci.resultstr += DISPLAY_COSINE;
    this.calci.renderDisplay();
  }
  
  /**
   * @method tan
   * @description Applies tangent
   * @returns {void}
   */
  public tan(): void {
    this.calci.evalstr += this.calci.modeManager.isDegreeMode() ? TANGENT_DEG : TANGENT;
    this.calci.resultstr += DISPLAY_TANGENT;
    this.calci.renderDisplay();
  }
  
  /**
   * @method floor
   * @description Applies floor function 
   * @returns {void}
   */
  public floor(): void {
    this.calci.evalstr += FLOOR;
    this.calci.resultstr += DISPLAY_FLOOR;
    this.calci.renderDisplay();
  }
  
  /**
   * @method ceil
   * @description Applies ceiling function 
   * @returns {void}
   */
  public ceil(): void {
    this.calci.evalstr += CEIL;
    this.calci.resultstr += DISPLAY_CEIL;
    this.calci.renderDisplay();
  }
  
  /**
   * @method log
   * @description Applies base-10 logarithm function 
   * @returns {void}
   */
  public log(): void {
    this.calci.evalstr += LOG10;
    this.calci.resultstr += DISPLAY_LOG;
    this.calci.renderDisplay();
  }
  
  /**
   * @method ln
   * @description Applies natural logarithm function
   * @returns {void}
   */
  public ln(): void {
    this.calci.evalstr += LN;
    this.calci.resultstr += DISPLAY_LN;
    this.calci.renderDisplay();
  }
  
  /**
   * @method abs
   * @description Applies absolute value function
   * @returns {void}
   */
  public abs(): void {
    this.calci.evalstr += ABS;
    this.calci.resultstr += DISPLAY_ABS;
    this.calci.renderDisplay();
  }
  
  /**
   * @method squareroot
   * @description Applies square root or cube root function
   * @returns {void}
   */
  public squareroot(): void {
    if (this.calci.modeManager.isSecondMode()) {
      this.calci.evalstr += CUBE_ROOT;
      this.calci.resultstr += DISPLAY_CUBE_ROOT;
    } else {
      this.calci.evalstr += SQUARE_ROOT;
      this.calci.resultstr += DISPLAY_SQUARE_ROOT;
    }
    this.calci.renderDisplay();
  }
}

export default MathOperations;