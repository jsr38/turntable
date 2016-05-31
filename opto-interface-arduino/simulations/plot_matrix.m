function plot_matrix(matrix, colnames, headline)
  maxrow=rows(colnames);
  xlabel(colnames{1})
  grid
  title(headline)
  rownr=2;
  s=sprintf("plot(matrix(:,1),matrix(:,%d),\";%s;\"",rownr,cell2mat(colnames(rownr,:)));
  while (rownr < maxrow)
    rownr=rownr+1;
    s=sprintf("%s,matrix(:,1),matrix(:,%d),\";%s;\"",
	      s,rownr,cell2mat(colnames(rownr,:)));
  endwhile
  s=sprintf("%s);",s);
  eval(s);
endfunction
