<script id="test" type="text/html">
[: if (title){ :]
	[: for (var i=0;i<list.length;i++) { :]
		<div>[:=i:]. [:=list[i].user:]</div>
	[:}:]
	[:=this.name||"name is not found !":]
[:}:]
</script>