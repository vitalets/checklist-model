describe('checklist-parent', function() {

  beforeEach(function() {
    browser().navigateTo(mainUrl);
  });

  var s = '[ng-controller="Ctrl5"] ';
  var a = s+' input[type="checkbox"]';
  var p = s+' button[ng-click="toggleCheck()"]';

  it('should initialize with correct values', function() {
    check(a, [0,1,0]);
    expect(element(s+'pre').text()).toBe('[\n  2\n]');
  });

  it('should check/uncheck items', function() {
    using(s+'label:eq(0)').input('checked').check(true);
    using(s+'label:eq(1)').input('checked').check(false);
    check(a, [1,0,0]);
    expect(element(s+'pre').text()).toBe('[\n  1\n]');
  });

  it('should check all', function() {
    element(s+'button[ng-click="checkAll()"]').click();
    check(a, [1,1,1]);
    expect(element(s+'pre').text()).toBe('[\n  1,\n  2,\n  3\n]');
  });

  it('should uncheck all', function() {
    element(s+'button[ng-click="uncheckAll()"]').click();
    check(a, [0,0,0]);
    expect(element(s+'pre').text()).toBe('[]');
  });

  it('should check first', function() {
    element(s+'button[ng-click="checkFirst()"]').click();
    check(a, [1,0,0]);
    expect(element(s+'pre').text()).toBe('[\n  1\n]');
  });

  it('should check all by clicking parent checkbox button', function() {
    element(p).click();
    expect(element(p).prop('class')).toContain('checked');
    check(a, [1,1,1]);
    expect(element(s+'pre').text()).toBe('[\n  1,\n  2,\n  3\n]');
  });

  it('should uncheck all by clicking parent checkbox button', function() {
    element(s+'button[ng-click="checkAll()"]').click();
    check(a, [1,1,1]);
    element(p).click();
    expect(element(p).prop('class')).toBe('checkbox');
    check(a, [0,0,0]);
    expect(element(s+'pre').text()).toBe('[]');
  });

  it('should toggle checked class of parent checkbox button when a children checkbox is unchecked', function() {
    expect(element(p).prop('class')).toBe('checkbox');
    element(p).click();
    expect(element(p).prop('class')).toContain('checked');
    check(a, [1,1,1]);
    using(s+'label:eq(0)').input('checked').check(false);
    check(a, [0,1,1]);
    expect(element(p).prop('class')).toBe('checkbox');
  });

});