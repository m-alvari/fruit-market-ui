export function isNumber(value :string | null) : boolean  {
  const reg =  /^(-)?\d*(\.\d+)?$/ ;
  if (value == null) {
    return false;
  }
  return !!value.match(reg);
}
