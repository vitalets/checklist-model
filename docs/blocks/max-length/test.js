describe('max-length', function() {

  beforeEach(function() {
    browser().navigateTo(mainUrl);
  });

  var s = '[ng-controller="Ctrl9"] ';
  var a = s+' input[type="checkbox"]';

  it('should initialize with correct values', function() {
    check(a, [0,1,0,0]);
    expect(element(s+'pre').text()).toBe('[\n  \"user\"\n]');
  });

  it('should check/uncheck items', function() {
    using(s+'label:eq(0)').input('checked').check(true);
    using(s+'label:eq(1)').input('checked').check(false);
    check(a, [1,0,0,0]);
    expect(element(s+'pre').text()).toBe('[\n  \"guest\"\n]');
  });

  it('should check only 2', function() {
    using(s+'label:eq(0)').input('checked').check(true);
    using(s+'label:eq(1)').input('checked').check(true);
    using(s+'label:eq(2)').input('checked').check(true);
    using(s+'label:eq(3)').input('checked').check(true);
    check(a, [1,0,1,0]);
    expect(element(s+'pre').text()).toBe('[\n  \"guest\",\n  \"customer\"\n]');
  });

});